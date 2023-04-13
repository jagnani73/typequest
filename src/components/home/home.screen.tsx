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
      const a = listenerRef.current!.simple_combo(binding, () => {
        backgroundColorHandler(i);
      });
      console.log(a);
    });

    return () => {
      listenerRef.current?.destroy();
    };
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
      if (selectedBlock === i) {
        setSelectedBlock(null);
        setNewBinding("");
      } else {
        setSelectedBlock(i);
        listenerRef.current!.unregister_combo(blockSettings[i].binding);
      }
    },
    [listenerRef, selectedBlock]
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
        setSelectedBlock(null);
      }
    },
    [newBinding, selectedBlock, listenerRef]
  );

  return (
    <div className="flex flex-col w-full h-full">
      <nav className="bg-white h-28 px-6 flex items-center justify-center text-center text-xl rounded-t-lg w-full">
        <p>
          Press the sequence shown in a block to change it's background color.
          The triggers are sequence-sensitive. Click on a block again to
          deselect it.
        </p>
      </nav>

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

      <footer className="bg-white h-20 flex items-center justify-center text-center text-xl rounded-t-lg w-full">
        {selectedBlock !== null ? (
          <div className="flex gap-x-8 items-center justify-center">
            <input
              readOnly
              type="text"
              autoFocus
              value={newBinding.replaceAll(" ", " + ")}
              className="outline-none text-center border-b focus:border-b-4 focus:border-b-black"
              placeholder={blockSettings[selectedBlock].binding}
              onKeyDownCapture={(e) =>
                setNewBinding((prevState) =>
                  !prevState.split(" ").includes(e.key.toLowerCase())
                    ? `${prevState} ${e.key.toLowerCase()}`.trim()
                    : prevState
                )
              }
            />
            <button
              onClick={() => changeBindingHandler(newBinding)}
              className="bg-black px-2 py-1 rounded text-white text-base"
            >
              Save binding
            </button>
          </div>
        ) : (
          <p>Click on a block to edit its's trigger.</p>
        )}
      </footer>
    </div>
  );
};

export default HomeScreen;
