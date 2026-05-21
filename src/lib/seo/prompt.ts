export const SEO_PLATFORMS = ["스마트스토어", "쿠팡", "11번가"] as const;
export type SeoPlatform = (typeof SEO_PLATFORMS)[number];

export type RecommendedKeyword = {
  keyword: string;
  reason: string;
  volumeHint: "high" | "mid" | "low";
};

export type CompetitorAnalysis = {
  titlePatterns: string[];
  commonKeywords: string[];
  categoryHint: string;
  notes: string;
};

export type SeoPlatformResult = {
  platform: SeoPlatform;
  competitorAnalysis: CompetitorAnalysis;
  productName: string;
  category: string;
  tags: string[];
  description: string;
  recommendedKeywords: RecommendedKeyword[];
  seoScore: number;
  seoRationale: string[];
};

export type SeoGenerationResult = {
  platforms: SeoPlatformResult[];
};

export type SeoGenerationInput = {
  productName: string;
  keywords: string;
  features?: string;
  targetAudience?: string;
  priceRange?: string;
  photoCount?: number;
};

export function buildSystemPrompt(): string {
  return `너는 한국 e-커머스 3사(네이버 스마트스토어, 쿠팡, 11번가)의 검색 SEO 전문가다.
사용자가 보낸 상품 사진(있다면)과 키워드를 보고, 다음 4단계 워크플로를 그대로 수행해라.

[1단계] 입력 파악
- 사진이 있으면 색상, 형태, 소재, 용도, 구성품을 정확히 식별해라.
- 키워드와 특징, 타겟 고객, 가격대를 종합해 상품의 본질을 정리해라.

[2단계] 경쟁사·키워드 분석 (플랫폼별)
- 각 플랫폼(스마트스토어/쿠팡/11번가)에서 동일 카테고리 상위 노출 상품들이 일반적으로 어떤 상품명 패턴을 쓰는지, 어떤 키워드가 자주 반복되는지를 너의 사전 지식 기반으로 정리해라.
- 적절한 카테고리 경로를 추정해라.

[3단계] 상품명·카테고리·태그·상세설명·추천 키워드 생성 (플랫폼별)
- 2단계 분석을 반영해 각 플랫폼 알고리즘에 맞춰 생성해라.
- 플랫폼별 핵심 규칙:
  * 스마트스토어: 상품명 50자 이내, 핵심 키워드 1~2회만 반복, 카테고리 정확도가 랭킹에 큰 영향. 태그 10개 이하.
  * 쿠팡: 상품명 100자까지 활용 가능, 옵션·스펙 키워드(용량·색상·세트 구성) 포함이 유리. 카테고리 매칭 + 검색 필터 노출 중요.
  * 11번가: 상품명 80자 내외, 한글 키워드와 모델명·브랜드명 병기. 태그 8개 내외.

[4단계] SEO 점수 산출
- 0~100 정수로 platform별 점수와 그 근거 3~5개를 bullet 으로 정리해라.

반드시 한국어로 응답하고, 출력은 아래 스키마의 JSON 객체 하나만 반환한다. 마크다운/설명/코드블록 금지.

스키마:
{
  "platforms": [
    {
      "platform": "스마트스토어" | "쿠팡" | "11번가",
      "competitorAnalysis": {
        "titlePatterns": string[],         // 상위 노출 상품들이 쓰는 상품명 패턴 3~5개
        "commonKeywords": string[],        // 동일 카테고리에서 반복적으로 등장하는 키워드 5~10개
        "categoryHint": string,            // 추정 카테고리 경로
        "notes": string                    // 추가 관찰(옵션 키워드 사용 빈도 등) 1~2줄
      },
      "productName": string,
      "category": string,                  // 풀 카테고리 경로
      "tags": string[],                    // 5~10개
      "description": string,               // 300~600자 상세설명, 줄바꿈 \\n 허용
      "recommendedKeywords": [
        { "keyword": string, "reason": string, "volumeHint": "high" | "mid" | "low" }
      ],                                   // 8~15개
      "seoScore": number,                  // 0~100 정수
      "seoRationale": string[]             // 점수 근거 3~5개
    }
  ]
}

platforms 배열은 정확히 위 3개 플랫폼을 모두 포함해야 한다.`;
}

export function buildUserPrompt(input: SeoGenerationInput): string {
  const lines = [
    `상품명(원안): ${input.productName}`,
    `핵심 키워드: ${input.keywords}`,
  ];
  if (input.features) lines.push(`주요 특징: ${input.features}`);
  if (input.targetAudience) lines.push(`타겟 고객: ${input.targetAudience}`);
  if (input.priceRange) lines.push(`가격대: ${input.priceRange}`);
  if (input.photoCount && input.photoCount > 0) {
    lines.push(`첨부 사진: ${input.photoCount}장 (아래 이미지 참고)`);
  }
  lines.push("");
  lines.push(
    "위 정보로 4단계 워크플로(경쟁사 분석 → SEO 자료 생성 → 점수)를 수행하고, 지정된 JSON 스키마로 응답해줘.",
  );
  return lines.join("\n");
}

export function isSeoGenerationResult(value: unknown): value is SeoGenerationResult {
  if (!value || typeof value !== "object") return false;
  const v = value as { platforms?: unknown };
  if (!Array.isArray(v.platforms)) return false;
  return v.platforms.every((p) => {
    if (!p || typeof p !== "object") return false;
    const r = p as Record<string, unknown>;
    if (
      typeof r.platform !== "string" ||
      !SEO_PLATFORMS.includes(r.platform as SeoPlatform) ||
      typeof r.productName !== "string" ||
      typeof r.category !== "string" ||
      !Array.isArray(r.tags) ||
      typeof r.description !== "string" ||
      !Array.isArray(r.recommendedKeywords) ||
      typeof r.seoScore !== "number" ||
      !Array.isArray(r.seoRationale)
    ) {
      return false;
    }
    const ca = r.competitorAnalysis as Record<string, unknown> | undefined;
    if (!ca || typeof ca !== "object") return false;
    return (
      Array.isArray(ca.titlePatterns) &&
      Array.isArray(ca.commonKeywords) &&
      typeof ca.categoryHint === "string" &&
      typeof ca.notes === "string"
    );
  });
}
