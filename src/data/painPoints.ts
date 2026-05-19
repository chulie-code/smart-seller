export type PainPoint = {
  icon: string;
  title: string;
  body: string;
};

export const painPoints: PainPoint[] = [
  {
    icon: "⏱️",
    title: "상품 1개 등록에 1시간이 넘어요",
    body: "상세설명·태그·카테고리를 하나하나 채우다 보면 어느새 하루가 끝나요.",
  },
  {
    icon: "✍️",
    title: "상세페이지 글이 안 써져요",
    body: "내 상품인데도 막상 매력적인 문구가 떠오르지 않아 빈 화면만 노려봅니다.",
  },
  {
    icon: "🔍",
    title: "어떤 키워드를 넣어야 할지 모르겠어요",
    body: "검색 노출에 좋은 키워드가 뭔지, 어디서 찾는지조차 막막합니다.",
  },
  {
    icon: "📈",
    title: "경쟁사 분석은 엄두도 못 내요",
    body: "혼자 운영하다 보니 시장조사할 시간이 늘 부족합니다.",
  },
];
