export const site = {
  brandName: "셀러봇",
  tagline: "매출에 집중하세요. 상품 등록은 AI가 합니다.",
  shortTagline: "1인 셀러를 위한 AI 상품 등록 대행",
  description:
    "사진과 키워드만 보내주시면, 경쟁사 분석을 거쳐 SEO 최적화된 상품명·상세설명·태그·카테고리가 채워진 일괄등록용 엑셀을 24시간 안에 보내드립니다.",
  ctaPrimary: {
    label: "무료 샘플 받기",
    href: "#cta",
  },
  ctaSecondary: {
    label: "작동 방식 보기",
    href: "#how",
  },
  channels: {
    kakao: {
      label: "카카오톡 상담",
      url: "#",
      hint: "평일 10–19시 응답",
    },
    email: {
      label: "이메일 문의",
      url: "#",
      hint: "hello@sellerbot.example",
    },
  },
  nav: [
    { href: "#how", label: "작동 방식" },
    { href: "#features", label: "기능" },
    { href: "#sample", label: "샘플" },
    { href: "#pricing", label: "가격" },
    { href: "#faq", label: "FAQ" },
  ],
} as const;

export type SiteConfig = typeof site;
