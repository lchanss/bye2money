type DividerProps = {
  orientation?: "horizontal" | "vertical";
  color?: string;
  className?: string;
};

export default function Divider({
  orientation = "horizontal",
  className,
  color = "border-neutral-text-default",
}: DividerProps) {
  const orientationClass =
    orientation === "horizontal" ? "border-b w-full" : "border-r h-full";
  const styleClass = `${color} ${orientationClass} ${className}`;
  return <div className={styleClass} />;
}
