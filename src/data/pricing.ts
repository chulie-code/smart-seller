export type PricingPlan = {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  ctaLabel: string;
  highlight?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "샘플 1건",
    price: "무료",
    unit: "첫 상품 한정",
    description: "AI가 만든 결과물을 직접 확인해 보세요.",
    features: [
      "상품 1개 등록 콘텐츠",
      "스마트스토어 또는 쿠팡 1개 마켓",
      "1영업일 이내 납품",
    ],
    ctaLabel: "무료 샘플 신청",
  },
  {
    name: "스타터",
    price: "₩79,000",
    unit: "10건 패키지 · 개당 ₩7,900",
    description: "처음 시작하는 1인 셀러가 가장 많이 선택해요.",
    features: [
      "상품 10개 등록 콘텐츠",
      "스마트스토어 + 쿠팡 동시 납품",
      "24시간 이내 납품",
      "1회 무료 수정",
    ],
    ctaLabel: "스타터 시작하기",
    highlight: true,
  },
  {
    name: "그로스",
    price: "₩299,000",
    unit: "월 50건 · 개당 ₩5,980",
    description: "꾸준히 상품을 늘리는 셀러를 위한 정기 플랜.",
    features: [
      "월 50개 등록 콘텐츠",
      "스마트스토어 + 쿠팡 + 11번가",
      "우선 납품 (당일)",
      "월간 키워드 리포트 1회",
    ],
    ctaLabel: "그로스 문의하기",
  },
];
