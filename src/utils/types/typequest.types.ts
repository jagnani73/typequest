import type { Listener } from "keypress.js";

export interface ShortcutComponentProps {
  binding: string;
  callback: (...args: any) => any;
  listener: Listener;
}
