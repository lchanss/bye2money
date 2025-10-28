import { useState } from "react";

import CalendarIcon from "@/assets/icons/calendar.svg?react";
import ChartIcon from "@/assets/icons/chart.svg?react";
import DocIcon from "@/assets/icons/doc.svg?react";

const VIEW_LIST: { type: ViewType; icon: React.ComponentType }[] = [
  { type: "documents", icon: DocIcon },
  { type: "calendar", icon: CalendarIcon },
  { type: "charts", icon: ChartIcon },
] as const;
type ViewType = "documents" | "calendar" | "charts";

export default function ViewSelector() {
  const [selectedView, setSelectedView] = useState<ViewType>("documents");

  const handleViewChange = (view: ViewType) => {
    setSelectedView(view);
  };

  return (
    <div className="flex gap-1">
      {VIEW_LIST.map((view) => (
        <ViewButton
          key={view.type}
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
  onClick: () => void;
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
