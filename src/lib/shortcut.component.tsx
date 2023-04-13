import { useEffect } from "react";
import type { ShortcutComponentProps } from "./types";
import { useTypequest } from "./typequest";

const ShortcutComponent: React.FC<ShortcutComponentProps> = ({
  binding,
  callback,
}) => {
  const { typequest } = useTypequest();

  useEffect(() => {
    if (typequest) {
      typequest.simple_combo(binding, callback);
    }
  }, [typequest]);

  return <></>;
};

export default ShortcutComponent;
