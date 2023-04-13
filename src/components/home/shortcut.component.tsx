import type { Listener } from "keypress.js";
import { useEffect } from "react";

const ShortcutComponent: React.FC<{
  listener: Listener;
  binding: string;
  callback: (...args: any) => any;
}> = ({ binding, callback, listener }) => {
  useEffect(() => {
    listener.simple_combo(binding, callback);
  }, []);

  return <></>;
};

export default ShortcutComponent;
