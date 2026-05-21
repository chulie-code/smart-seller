export const site = {
  brandName: "셀러봇",
  tagline: "매출에 집중하세요. 상품 등록은 AI가 합니다.",
  shortTagline: "1인 셀러를 위한 AI 상품 등록 도우미",
  description:
    "사진과 키워드만 입력하면, 경쟁사 분석을 거쳐 SEO 최적화된 상품명·상세설명·태그·카테고리가 채워진 일괄등록용 자료를 AI가 즉시 만들어드립니다. 회원 가입만 하면 모든 기능이 무료예요.",
  ctaPrimary: {
    label: "회원 무료로 시작하기",
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
    { href: "#sample", label: "샘플 결과" },
    { href: "#faq", label: "FAQ" },
    { href: "#cta", label: "AI 생성" },
  ],
} as const;

export type SiteConfig = typeof site;
