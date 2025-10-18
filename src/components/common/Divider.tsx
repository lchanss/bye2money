type DividerProps = {
  orientation?: "horizontal" | "vertical";
  color?: string;
};

export default function Divider({
  orientation = "horizontal",
  color = "border-neutral-text-default",
}: DividerProps) {
  const orientationClass =
    orientation === "horizontal" ? "border-b w-full" : "border-r h-full";
  const styleClass = `${color} ${orientationClass}`;

  return <div className={styleClass} />;
}
