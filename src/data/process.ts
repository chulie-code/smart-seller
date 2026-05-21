export type ProcessStep = {
  step: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "사진과 키워드 입력",
    body: "회원으로 로그인 후 상품 사진과 키워드 몇 개를 폼에 입력하기만 하면 됩니다.",
  },
  {
    step: "02",
    title: "AI 경쟁사·키워드 분석",
    body: "스마트스토어·쿠팡·11번가의 동일 카테고리 상위 노출 상품을 분석해 효과적인 키워드를 추립니다.",
  },
  {
    step: "03",
    title: "상품명·상세·태그 자동 생성",
    body: "SEO에 강한 상품명, 구매 전환을 노리는 상세설명, 검색 노출 태그까지 한 번에.",
  },
  {
    step: "04",
    title: "일괄등록 자료 즉시 다운로드",
    body: "스마트스토어·쿠팡·11번가 양식에 맞춘 CSV로 바로 다운로드. 회원 모두에게 무료입니다.",
  },
];
