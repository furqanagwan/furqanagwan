export default function DietBadge({ diet }: { diet?: string[] }) {
  if (!diet || diet.length === 0) return null;
  if (diet.includes("Vegan"))
    return <span className="ml-2 text-green-600 font-semibold">🌱 Vegan</span>;
  if (diet.includes("Vegetarian"))
    return (
      <span className="ml-2 text-orange-500 font-semibold">🥕 Vegetarian</span>
    );
  return null;
}
