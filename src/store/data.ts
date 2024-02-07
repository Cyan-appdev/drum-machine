import { create } from "zustand";

type AudioClip = {
  key: string;
  id: string;
  url: string;
};

type DataType = {
  selectedKit: AudioClip[];
  display: string;
  power: boolean;
  volume: number;
  updateData: (
    type: string,
    newValue: AudioClip[] | number | string | boolean,
  ) => void;
};

export const useDataStore = create<DataType>()((set) => ({
  selectedKit: [],
  display: "Heater Kit Selected",
  power: true,
  volume: 50,

  updateData: (type, newValue) => {
    if (type === "selectedKit" && typeof newValue === "object")
      return set({ selectedKit: newValue as AudioClip[] });
    if (type === "display" && typeof newValue === "string")
      return set({ display: newValue });
    if (type === "power" && typeof newValue === "boolean")
      return set({ power: newValue });
    if (type === "volume" && typeof newValue === "number")
      return set({ volume: newValue });
  },
}));
