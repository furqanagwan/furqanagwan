import { allQualifications } from "content-collections";
import { QUALIFICATION_CONSTANTS } from "./constants";
import { type Qualification } from "./utils";

export const getQualificationTypes = () => {
  const uniqueTypes = new Set(allQualifications.map((q) => q.type));
  return [QUALIFICATION_CONSTANTS.FILTER_ALL, ...Array.from(uniqueTypes)];
};

export const getFilteredQualifications = (activeType: string) => {
  if (activeType === QUALIFICATION_CONSTANTS.FILTER_ALL)
    return allQualifications;
  return allQualifications.filter((q) => q.type === activeType);
};
