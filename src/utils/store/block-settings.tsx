import { createContext, ReactNode, useContext, useState } from "react";

import type { BlockType } from "../types/home.types";
import { RandomColor } from "../helpers";

interface BlockSettingsContextType {
  blockSettings: BlockType[];
  setBlockSettings: React.Dispatch<React.SetStateAction<BlockType[]>>;
}

interface BlockSettingsProviderProps {
  children: ReactNode;
}

const BlockSettingsContext = createContext<BlockSettingsContextType>(
  {} as BlockSettingsContextType
);

export const BlockSettingsProvider: React.FC<BlockSettingsProviderProps> = ({
  children,
}) => {
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

  return (
    <BlockSettingsContext.Provider
      value={{
        blockSettings,
        setBlockSettings,
      }}
    >
      {children}
    </BlockSettingsContext.Provider>
  );
};

export const useBlockSettings = () => useContext(BlockSettingsContext);
