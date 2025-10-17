import CalendarIcon from "@/assets/icons/calendar.svg?react";
import DocIcon from "@/assets/icons/doc.svg?react";
import ChartIcon from "@/assets/icons/chart.svg?react";
import { useState } from "react";

const views: { type: ViewType; icon: React.ComponentType }[] = [
  { type: "documents", icon: DocIcon },
  { type: "calendar", icon: CalendarIcon },
  { type: "charts", icon: ChartIcon },
];
type ViewType = "documents" | "calendar" | "charts";

export default function ViewSelector() {
  const [selectedView, setSelectedView] = useState<ViewType>("documents");

  const handleViewChange = (view: ViewType) => {
    setSelectedView(view);
  };

  return (
    <div className="flex gap-1">
      {views.map((view) => (
        <ViewButton
          icon={view.icon}
          isSelected={selectedView === view.type}
          onClick={() => handleViewChange(view.type)}
        />
      ))}
    </div>
  );
}

type ViewButtonProps = {
  icon: React.ComponentType;
  isSelected: boolean;
  onClick?: () => void;
};

function ViewButton({ icon: Icon, isSelected, onClick }: ViewButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
        isSelected && "bg-neutral-surface-default"
      }`}
    >
      <Icon />
    </button>
  );
}
