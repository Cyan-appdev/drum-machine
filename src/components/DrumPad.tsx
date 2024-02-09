import { useEffect, useRef } from "react";
import { useDataStore } from "@/store/data";

export const DrumPad: React.FC = () => {
  const { selectedKit, power, volume, updateData } = useDataStore();

  const refs = useRef<HTMLAudioElement[]>([]);
  const btnRefs = useRef<HTMLButtonElement[]>([]);
  const audioRefs = refs.current;
  const buttonRefs = btnRefs.current;

  const baseClass =
    "drum-pad h-full w-full rounded-2xl p-10 text-xl text-white outline-blue-500 hover:outline hover:outline-2";
  const active = "bg-blue-700 scale-95 outline outline-2";
  const inactive = "bg-gray-900";

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      for (let i = 0; i < audioRefs.length; i++) {
        if (event.key.toLowerCase() === audioRefs[i].id.toLowerCase()) {
          handleClick(i, audioRefs[i].accessKey);
          break;
        }
      }
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [audioRefs, volume, power]);

  const handleClick = (index: number, id: string) => {
    if (power) {
      updateData("display", id);
      audioRefs[index].volume = volume * 0.01;
      audioRefs[index].currentTime = 0;
      audioRefs[index].play();

      buttonRefs[index].className = `${baseClass} ${active}`;
      setTimeout(() => {
        buttonRefs[index].className = `${baseClass} ${inactive}`;
      }, 100);
    }
  };

  return (
    <div className="grid aspect-video grid-cols-3 gap-2">
      {selectedKit.map((clip, index) => {
        return (
          <button
            key={clip.id}
            id={clip.id}
            className={`${baseClass} ${inactive}`}
            onClick={() => handleClick(index, clip.id)}
            disabled={!power}
            ref={(element: HTMLButtonElement) => {
              btnRefs.current[index] = element;
            }}
          >
            {clip.key}
            <audio
              id={clip.key}
              accessKey={clip.id}
              src={clip.url}
              className="clip"
              ref={(element: HTMLAudioElement) => {
                refs.current[index] = element;
              }}
            />
          </button>
        );
      })}
    </div>
  );
};
