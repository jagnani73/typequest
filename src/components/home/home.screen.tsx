import { useCallback, useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import type { BlockContext } from "../../utils/types/store.types";
import { BlockComponent } from ".";
import { RandomColor } from "../../utils/helpers";
import { useBlockSettings } from "../../utils/store";
import { ShortcutComponent, useTypequest } from "../../lib";

const HomeScreen: React.FC = () => {
  const INITIAL_BINDINGS = useMemo<string[]>(
    () => ["shift a", "shift b", "shift c"],
    []
  );

  const { typequest } = useTypequest();

  const { blockSettings, setBlockSettings } = useBlockSettings();

  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [newBinding, setNewBinding] = useState<string>("");

  useEffect(() => {
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
      if (typequest) {
        if (selectedBlock === id) {
          setSelectedBlock(null);
          setNewBinding("");
        } else {
          setSelectedBlock(id);
          typequest.unregister_combo(blockSettings[id].binding);
        }
      }
    },
    [typequest, selectedBlock, blockSettings]
  );

  const changeBindingHandler = useCallback(
    (id: string, keys: string) => {
      if (typequest && selectedBlock !== null) {
        typequest.simple_combo(keys, () => {
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
    [newBinding, selectedBlock, typequest]
  );

  return (
    <>
      <main className="flex h-full w-full">
        {Object.entries(blockSettings).map(
          ([id, { binding, callback, backgroundColor }]) => (
            <div
              key={id}
              className="w-full h-full"
              onClick={() => selectBlockHandler(id)}
            >
              <ShortcutComponent binding={binding} callback={callback} />
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
    </>
  );
};

export default HomeScreen;
