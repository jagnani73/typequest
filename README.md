Notes

- `lib` is the root folder for the library. In it are the following
  - `shortcut.component.tsx`: A simple listener to add a keyboard shortcut.
  - `typequest.tsx`: Singleton for `keypress.js` listener. It also exposes native methods for extensibility.

Improvements

- UI
- Library architecture
- Inclusion of `shortcut.component.tsx` natively in `typequest.tsx` using state-hooked props instead of manual renders
