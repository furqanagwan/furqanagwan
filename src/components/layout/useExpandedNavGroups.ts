"use client";

import { useState } from "react";
import { isSectionActive, type NavGroupSection } from "./navigation";

export function useExpandedNavGroups(pathname: string) {
  const [openedLabels, setOpenedLabels] = useState<string[]>([]);

  const toggleGroup = (label: string) => {
    setOpenedLabels((previous) =>
      previous.includes(label)
        ? previous.filter((openedLabel) => openedLabel !== label)
        : [...previous, label],
    );
  };

  const isGroupExpanded = (group: NavGroupSection) =>
    isSectionActive(pathname, group) || openedLabels.includes(group.label);

  return { toggleGroup, isGroupExpanded };
}
