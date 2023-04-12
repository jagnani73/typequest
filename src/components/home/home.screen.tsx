import { useEffect, useMemo, useState } from "react";
// ! Using `ts-ignore` here because the declaration file has an incorrect default export of `keypress`
// @ts-ignore
import { keypress, Listener } from "keypress.js";

import { BlockComponent } from ".";
import { RandomColor } from "../../utils/helpers";
import { BlockProps } from "../../utils/types/home.types";

const HomeScreen: React.FC = () => {
  // const [count, setCount] = useState<number>(3);
  const [blockSettings, setBlockSettings] = useState<BlockProps[]>([
    {
      backgroundColor: RandomColor(),
      textColor: RandomColor(),
    },
  ]);

  useEffect(() => {
    const Listener: Listener = new keypress.Listener();

    const list = Listener.simple_combo("shift s", () => {
      setBlockSettings(() => [
        {
          backgroundColor: RandomColor(),
          textColor: RandomColor(),
        },
      ]);
    });

    console.log(Listener.get_registered_combos());
  }, []);

  return (
    <main className="flex h-full w-full">
      {blockSettings.map((block, i) => (
        <BlockComponent key={i + Math.random()} {...block} />
      ))}
    </main>
  );
};

export default HomeScreen;
