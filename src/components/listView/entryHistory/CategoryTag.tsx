import Tag from "../../common/Tag";

type CategoryTagProps = {
  tag: Category;
};

type Category =
  | "생활"
  | "쇼핑/뷰티"
  | "의료/건강"
  | "식비"
  | "교통"
  | "문화/여가"
  | "미분류"
  | "월급"
  | "기타 수입"
  | "용돈";

const CATEGORY_COLOR_MAP: Record<Category, string> = {
  생활: "bg-colorchip-90",
  "쇼핑/뷰티": "bg-colorchip-30",
  "의료/건강": "bg-colorchip-50",
  식비: "bg-colorchip-60",
  교통: "bg-colorchip-70",
  "문화/여가": "bg-colorchip-100",
  미분류: "bg-colorchip-110",
  월급: "bg-colorchip-20",
  "기타 수입": "bg-colorchip-10",
  용돈: "bg-colorchip-40",
};

export default function CategoryTag({ tag }: CategoryTagProps) {
  return <Tag color={CATEGORY_COLOR_MAP[tag]} label={tag} />;
}
