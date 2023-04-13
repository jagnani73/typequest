import { useEffect } from "react";
import type { ShortcutComponentProps } from "../../utils/types/typequest.types";

const ShortcutComponent: React.FC<ShortcutComponentProps> = ({
  binding,
  callback,
  listener,
}) => {
  useEffect(() => {
    listener.simple_combo(binding, callback);
  }, []);

  return <></>;
};

export default ShortcutComponent;
