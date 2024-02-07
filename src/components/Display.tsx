import { useDataStore } from "@/store/data";

export const Display: React.FC = () => {
  const display = useDataStore().display;
  return (
    <div
      id="display"
      className="flex h-16 w-full items-center justify-center rounded-xl border border-amber-500"
    >
      <span id="display" className="text-xl font-semibold">
        {display}
      </span>
    </div>
  );
};
