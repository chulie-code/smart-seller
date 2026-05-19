export type SamplePair = {
  field: string;
  before: string;
  after: string;
};

export const samplePairs: SamplePair[] = [
  {
    field: "상품명",
    before: "주방 실리콘 주걱",
    after: "[1+1] 열에 강한 식품용 실리콘 주걱 230℃ 베이킹 요리 도구",
  },
  {
    field: "상세설명 도입부",
    before: "음식을 뜰 때 쓰는 주걱입니다. 색깔은 베이지입니다.",
    after:
      "230℃까지 견디는 식품용 실리콘으로, 뜨거운 팬 위에서도 변형 없이 사용할 수 있습니다. 손잡이까지 한 몸으로 만들어 음식물이 끼지 않아 위생적이에요.",
  },
  {
    field: "태그",
    before: "주걱, 실리콘",
    after:
      "실리콘주걱, 베이킹주걱, 내열주걱, 요리도구, 주방용품, 1+1주걱, 식품용실리콘, 베이지주걱",
  },
  {
    field: "카테고리",
    before: "주방용품",
    after: "주방용품 > 조리도구 > 주걱·뒤집개 > 실리콘주걱",
  },
];
