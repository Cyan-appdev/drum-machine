import { useEffect } from "react";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Label } from "@/components/ui/label";
import { Display } from "./Display";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  heaterKit,
  smoothPianoKit,
  acousticKit,
  houseKit,
} from "@/lib/audio-clips";
import { useDataStore } from "@/store/data";

export const Controller: React.FC = () => {
  const { power, volume, updateData } = useDataStore();

  useEffect(() => {
    updateData("selectedKit", [...heaterKit]);
  }, []);

  const handleSelect = (value: string) => {
    switch (value) {
      case "accoustic":
        updateData("selectedKit", [...acousticKit]);
        break;
      case "heater":
        updateData("selectedKit", [...heaterKit]);
        break;
      case "house":
        updateData("selectedKit", [...houseKit]);
        break;
      case "smoothPiano":
        updateData("selectedKit", [...smoothPianoKit]);
        break;
    }
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    updateData("display", `${capitalized} Kit Selected`);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-end gap-8">
        <div className="flex w-full items-center justify-between space-x-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="power">Power</Label>
            <Switch
              id="power"
              checked={power}
              onCheckedChange={() => {
                updateData(
                  "display",
                  !power ? "Power ON" : "Switch power to use",
                );
                updateData("power", !power);
              }}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="volume">Volume</Label>
            <Slider
              id="volume"
              defaultValue={[volume]}
              onValueChange={(value) => {
                updateData("volume", value[0]);
                updateData("display", `Volume: ${value}`);
                setTimeout(() => {
                  updateData("display", "");
                }, 1000);
              }}
              max={100}
              step={1}
              className="w-[180px]"
              disabled={!power}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="select">Drum Kit</Label>
          <Select
            defaultValue="heater"
            onValueChange={(value) => handleSelect(value)}
          >
            <SelectTrigger id="select" className="w-[180px]" disabled={!power}>
              <SelectValue placeholder="choose kit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accoustic">Accoustic</SelectItem>
              <SelectItem value="heater">Heater</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="smoothPiano">Smooth Piano</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Display />
      </div>
    </div>
  );
};
