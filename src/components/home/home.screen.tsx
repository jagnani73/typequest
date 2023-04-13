import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// ! Using `ts-ignore` here because the declaration file has an incorrect default export of `keypress`
// @ts-ignore
import { keypress, Listener } from "keypress.js";
import { nanoid } from "nanoid";

import type { BlockContext } from "../../utils/types/store.types";
import { BlockComponent, ShortcutComponent } from ".";
import { RandomColor } from "../../utils/helpers";
import { useBlockSettings } from "../../utils/store";

const HomeScreen: React.FC = () => {
  const INITIAL_BINDINGS = useMemo<string[]>(
    () => ["shift a", "shift b", "shift c"],
    []
  );

  const listenerRef = useRef<Listener | null>(null);

  const { blockSettings, setBlockSettings } = useBlockSettings();

  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [newBinding, setNewBinding] = useState<string>("");

  useEffect(() => {
    listenerRef.current = new keypress.Listener() as Listener;

    const _blockSettings: BlockContext = {};
    INITIAL_BINDINGS.forEach((binding) => {
      const id = nanoid();

      _blockSettings[id] = {
        binding: binding,
        callback: () => backgroundColorHandler(id),
        backgroundColor: RandomColor(),
      };
    });
    setBlockSettings(_blockSettings);

    return () => {
      listenerRef.current?.destroy();
    };
  }, []);

  const backgroundColorHandler = useCallback((id: string) => {
    setBlockSettings((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        backgroundColor: RandomColor(),
      },
    }));
  }, []);

  const selectBlockHandler = useCallback(
    (id: string) => {
      if (selectedBlock === id) {
        setSelectedBlock(null);
        setNewBinding("");
      } else {
        setSelectedBlock(id);
        listenerRef.current!.unregister_combo(blockSettings[id].binding);
      }
    },
    [listenerRef, selectedBlock, blockSettings]
  );

  const changeBindingHandler = useCallback(
    (id: string, keys: string) => {
      if (selectedBlock !== null) {
        listenerRef.current!.simple_combo(keys, () => {
          backgroundColorHandler(selectedBlock);
        });
        setBlockSettings((prevState) => ({
          ...prevState,
          [id]: {
            ...prevState[id],
            binding: keys,
          },
        }));
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
        {listenerRef.current &&
          Object.entries(blockSettings).map(
            ([id, { binding, callback, backgroundColor }]) => (
              <div
                key={id}
                className="w-full h-full"
                onClick={() => selectBlockHandler(id)}
              >
                <ShortcutComponent
                  binding={binding}
                  callback={callback}
                  listener={listenerRef.current!}
                />
                <BlockComponent
                  selected={id === selectedBlock}
                  binding={binding}
                  backgroundColor={backgroundColor}
                />
              </div>
            )
          )}
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
              onClick={() => changeBindingHandler(selectedBlock, newBinding)}
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
