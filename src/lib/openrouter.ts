const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemini-2.5-flash";

export type UserContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string } };

type Message =
  | { role: "system"; content: string }
  | { role: "user"; content: string | UserContentPart[] }
  | { role: "assistant"; content: string };

export class OpenRouterError extends Error {
  constructor(message: string, readonly cause?: unknown) {
    super(message);
    this.name = "OpenRouterError";
  }
}

export async function callGeminiJson<T>(
  systemPrompt: string,
  userContent: string | UserContentPart[],
  opts: { model?: string; timeoutMs?: number } = {},
): Promise<T> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new OpenRouterError(
      "OPENROUTER_API_KEY 환경 변수가 설정되지 않았습니다.",
    );
  }

  const messages: Message[] = [
    { role: "system", content: systemPrompt },
    { role: "user", content: userContent },
  ];

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    opts.timeoutMs ?? 90_000,
  );

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sellerbot.example",
        "X-Title": "Smart Seller SEO",
      },
      body: JSON.stringify({
        model: opts.model ?? DEFAULT_MODEL,
        messages,
        response_format: { type: "json_object" },
        temperature: 0.4,
      }),
    });
  } catch (err) {
    throw new OpenRouterError("OpenRouter 호출에 실패했습니다.", err);
  } finally {
    clearTimeout(timeout);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new OpenRouterError(
      `OpenRouter 응답 오류 (${res.status}): ${detail.slice(0, 200)}`,
    );
  }

  const payload = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) {
    throw new OpenRouterError("OpenRouter 응답에서 내용을 찾지 못했습니다.");
  }

  try {
    return JSON.parse(content) as T;
  } catch (err) {
    throw new OpenRouterError("모델이 JSON 형식으로 응답하지 않았습니다.", err);
  }
}
