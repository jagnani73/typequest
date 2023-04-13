import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
// ! Using `ts-ignore` here because the declaration file has an incorrect default export of `keypress`
// @ts-ignore
import { keypress } from "keypress.js";
import type { Listener } from "keypress.js";

interface TypequestContextType {
  typequest: Listener | null;
}

interface TypequestProviderProps {
  children: ReactNode;
}

const TypeQuestContext = createContext<TypequestContextType>(
  {} as TypequestContextType
);

export const TypequestProvider: React.FC<TypequestProviderProps> = ({
  children,
}) => {
  return (
    <TypeQuestContext.Provider
      value={{
        typequest: new keypress.Listener() as Listener,
      }}
    >
      {children}
    </TypeQuestContext.Provider>
  );
};

export const useTypequest = () => useContext(TypeQuestContext);
