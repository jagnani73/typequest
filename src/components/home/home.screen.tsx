import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// ! Using `ts-ignore` here because the declaration file has an incorrect default export of `keypress`
// @ts-ignore
import { keypress, Listener } from "keypress.js";

import { BlockComponent } from ".";
import { RandomColor } from "../../utils/helpers";
import { BlockType } from "../../utils/types/home.types";

const HomeScreen: React.FC = () => {
  const listenerRef = useRef<Listener | null>(null);

  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [blockSettings, setBlockSettings] = useState<BlockType[]>([
    {
      backgroundColor: RandomColor(),
      textColor: RandomColor(),
      binding: "shift a",
    },
    {
      backgroundColor: RandomColor(),
      textColor: RandomColor(),
      binding: "shift b",
    },
    {
      backgroundColor: RandomColor(),
      textColor: RandomColor(),
      binding: "shift c",
    },
  ]);

  const handleBackgroundColor = useCallback((i: number) => {
    setBlockSettings((prevState) => {
      const newArray = [...prevState];
      newArray[i] = {
        ...newArray[i],
        backgroundColor: RandomColor(),
        textColor: RandomColor(),
      };
      return newArray;
    });
  }, []);

  useEffect(() => {
    listenerRef.current = new keypress.Listener() as Listener;

    blockSettings.forEach(({ binding }, i) => {
      listenerRef.current!.simple_combo(binding, () => {
        handleBackgroundColor(i);
      });
    });

    console.log(listenerRef.current.get_registered_combos());
  }, []);

  return (
    <main className="flex h-full w-full">
      {blockSettings.map((block, i) => (
        <div
          className="w-full h-full"
          key={i + Math.random()}
          onClick={() => setSelectedBlock(i)}
        >
          <BlockComponent block={block} selected={i === selectedBlock} />
        </div>
      ))}
    </main>
  );
};

export default HomeScreen;
