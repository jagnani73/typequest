import { useCallback, useEffect, useRef, useState } from "react";
// ! Using `ts-ignore` here because the declaration file has an incorrect default export of `keypress`
// @ts-ignore
import { keypress, Listener } from "keypress.js";

import { BlockComponent } from ".";
import { RandomColor } from "../../utils/helpers";
import { useBlockSettings } from "../../utils/store";

const HomeScreen: React.FC = () => {
  const listenerRef = useRef<Listener | null>(null);

  const { blockSettings, setBlockSettings } = useBlockSettings();

  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  useEffect(() => {
    listenerRef.current = new keypress.Listener() as Listener;

    blockSettings.forEach(({ binding }, i) => {
      listenerRef.current!.simple_combo(binding, () => {
        handleBackgroundColor(i);
      });
    });

    console.log(listenerRef.current.get_registered_combos());
  }, []);

  const handleBackgroundColor = useCallback((i: number) => {
    setBlockSettings((prevState) => {
      const newArray = [...prevState];
      newArray[i] = {
        ...newArray[i],
        backgroundColor: RandomColor(),
      };
      return newArray;
    });
  }, []);

  const selectBlockHandler = useCallback(
    (i: number) => {
      setSelectedBlock(i);
      listenerRef.current!.unregister_combo(blockSettings[i].binding);
      const { keys } = listenerRef.current!.register_combo({
        keys: "w e",
      });
      setBlockSettings((prevState) => {
        const newArray = [...prevState];
        newArray[i] = {
          ...newArray[i],
          binding: keys!,
        };
        return newArray;
      });
      listenerRef.current!.simple_combo(keys!, () => {
        handleBackgroundColor(i);
      });
    },
    [listenerRef]
  );

  return (
    <>
      <main className="flex h-full w-full">
        {blockSettings.map((block, i) => (
          <div
            className="w-full h-full"
            key={i + Math.random()}
            onClick={() => selectBlockHandler(i)}
          >
            <BlockComponent block={block} selected={i === selectedBlock} />
          </div>
        ))}
      </main>

      {selectedBlock ? (
        <footer className="bg-white fixed bottom-0 left-0 w-full">
          <input
            type="text"
            placeholder={blockSettings[selectedBlock].binding}
          />
        </footer>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomeScreen;
