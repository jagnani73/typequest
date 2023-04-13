import { createContext, ReactNode, useContext, useState } from "react";

import type { BlockContext } from "../types/store.types";

interface BlockSettingsContextType {
  blockSettings: BlockContext;
  setBlockSettings: React.Dispatch<React.SetStateAction<BlockContext>>;
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
  const [blockSettings, setBlockSettings] = useState<BlockContext>({});

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
