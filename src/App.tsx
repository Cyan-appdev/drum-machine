import { Controller } from "./components/Controller";
import { DrumPad } from "./components/DrumPad";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white">
      <div
        id="drum-machine"
        className="flex w-full max-w-[800px] flex-col gap-5 rounded-3xl bg-gray-800  p-6 pt-10 shadow-xl outline outline-8 outline-gray-300"
      >
        <Controller />
        <div className="">
          <DrumPad />
        </div>
      </div>
      <p className="text-xs text-cyan-400">Designed and coded by CyanDev</p>
    </div>
  );
}

export default App;
