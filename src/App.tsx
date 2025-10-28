import Checkbox from "./components/common/Checkbox";

import Tag from "./components/common/Tag";

import Header from "@/components/header/Header";
import InputBar from "@/components/inputBar/InputBar";

function App() {
  return (
    <div className="text-neutral-text-default text-light-14">
      <Header />
      <main className="mt-[-40px] flex flex-col items-center">
        <InputBar />
        <Checkbox label="Checkbox Label" checked={false} onChange={() => {}} />
        <Tag color="bg-colorchip-90" label="생활" />
      </main>
    </div>
  );
}

export default App;
