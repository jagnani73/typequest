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
  const [newBinding, setNewBinding] = useState<string>("");

  useEffect(() => {
    listenerRef.current = new keypress.Listener() as Listener;

    blockSettings.forEach(({ binding }, i) => {
      listenerRef.current!.simple_combo(binding, () => {
        backgroundColorHandler(i);
      });
    });

    console.log(listenerRef.current.get_registered_combos());
  }, []);

  const backgroundColorHandler = useCallback((i: number) => {
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
    },
    [listenerRef]
  );

  const changeBindingHandler = useCallback(
    (keys: string) => {
      if (selectedBlock !== null) {
        listenerRef.current!.simple_combo(keys, () => {
          backgroundColorHandler(selectedBlock);
        });
        setBlockSettings((prevState) => {
          const newArray = [...prevState];
          newArray[selectedBlock] = {
            ...newArray[selectedBlock],
            binding: keys,
          };
          return newArray;
        });
        setNewBinding("");
      }
    },
    [newBinding, selectedBlock, listenerRef]
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

      <footer className="bg-white fixed bottom-0 left-0 w-full">
        {selectedBlock !== null ? (
          <div>
            <input
              readOnly
              type="text"
              value={newBinding}
              placeholder={blockSettings[selectedBlock].binding}
              onKeyDown={(e) =>
                setNewBinding((prevState) =>
                  `${prevState} ${e.key.toLowerCase()}`.trim()
                )
              }
            />

            <button onClick={() => changeBindingHandler(newBinding)}>
              Save binding
            </button>
          </div>
        ) : (
          <p>Click on a block to edit it</p>
        )}
      </footer>
    </>
  );
};

export default HomeScreen;
