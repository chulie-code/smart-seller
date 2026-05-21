"use server";

import { createClient } from "@/lib/supabase/server";
import {
  OpenRouterError,
  callGeminiJson,
  type UserContentPart,
} from "@/lib/openrouter";
import {
  buildSystemPrompt,
  buildUserPrompt,
  isSeoGenerationResult,
  type SeoGenerationInput,
  type SeoGenerationResult,
} from "@/lib/seo/prompt";

export type SeoActionState = {
  error?: string;
  message?: string;
  result?: SeoGenerationResult;
  input?: SeoGenerationInput;
};

const RATE_LIMIT_PER_MIN = 5;
const MAX_PHOTOS = 3;
const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);

export async function generateSeo(
  _prev: SeoActionState | undefined,
  formData: FormData,
): Promise<SeoActionState> {
  const input: SeoGenerationInput = {
    productName: String(formData.get("productName") ?? "").trim(),
    keywords: String(formData.get("keywords") ?? "").trim(),
    features: String(formData.get("features") ?? "").trim() || undefined,
    targetAudience:
      String(formData.get("targetAudience") ?? "").trim() || undefined,
    priceRange: String(formData.get("priceRange") ?? "").trim() || undefined,
  };

  if (!input.productName || !input.keywords) {
    return { error: "상품명과 핵심 키워드를 입력해주세요.", input };
  }
  if (input.productName.length > 120) {
    return { error: "상품명은 120자 이하로 입력해주세요.", input };
  }
  if (input.keywords.length > 300) {
    return { error: "키워드는 300자 이하로 입력해주세요.", input };
  }
  if (input.features && input.features.length > 800) {
    return { error: "주요 특징은 800자 이하로 입력해주세요.", input };
  }

  const rawPhotos = formData
    .getAll("photos")
    .filter((p): p is File => p instanceof File && p.size > 0);
  if (rawPhotos.length > MAX_PHOTOS) {
    return { error: `사진은 최대 ${MAX_PHOTOS}장까지 첨부할 수 있어요.`, input };
  }
  for (const f of rawPhotos) {
    if (!ALLOWED_PHOTO_TYPES.has(f.type)) {
      return {
        error: "JPG, PNG, WEBP 이미지만 첨부할 수 있어요.",
        input,
      };
    }
    if (f.size > MAX_PHOTO_BYTES) {
      return { error: "사진 한 장은 4MB 이하여야 해요.", input };
    }
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "로그인 후 이용할 수 있어요.", input };
  }

  const oneMinAgo = new Date(Date.now() - 60_000).toISOString();
  const { count } = await supabase
    .from("seo_generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", oneMinAgo);

  if ((count ?? 0) >= RATE_LIMIT_PER_MIN) {
    return {
      error: "잠시 후 다시 시도해주세요. 분당 호출 한도를 초과했어요.",
      input,
    };
  }

  input.photoCount = rawPhotos.length;

  const photoParts: UserContentPart[] = await Promise.all(
    rawPhotos.map(async (f) => {
      const buf = Buffer.from(await f.arrayBuffer());
      return {
        type: "image_url" as const,
        image_url: { url: `data:${f.type};base64,${buf.toString("base64")}` },
      };
    }),
  );

  const userContent: string | UserContentPart[] =
    photoParts.length > 0
      ? [{ type: "text" as const, text: buildUserPrompt(input) }, ...photoParts]
      : buildUserPrompt(input);

  let result: SeoGenerationResult;
  try {
    const raw = await callGeminiJson<unknown>(
      buildSystemPrompt(),
      userContent,
    );
    if (!isSeoGenerationResult(raw)) {
      return {
        error: "AI 응답 형식이 올바르지 않아요. 다시 시도해주세요.",
        input,
      };
    }
    result = raw;
  } catch (err) {
    const message =
      err instanceof OpenRouterError
        ? "AI 생성 중 문제가 발생했어요. 잠시 후 다시 시도해주세요."
        : "예상치 못한 오류가 발생했어요.";
    console.error("[generateSeo]", err);
    return { error: message, input };
  }

  const { error: insertError } = await supabase.from("seo_generations").insert({
    user_id: user.id,
    product_name: input.productName,
    keywords: input.keywords,
    features: input.features ?? null,
    target_audience: input.targetAudience ?? null,
    price_range: input.priceRange ?? null,
    result,
  });

  if (insertError) {
    console.error("[generateSeo:insert]", insertError);
  }

  return {
    message: "AI SEO 자료가 생성됐어요.",
    result,
    input,
  };
}
