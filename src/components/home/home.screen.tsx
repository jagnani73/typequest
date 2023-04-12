import { useEffect } from "react";
// ! Using `ts-ignore` here because the declaration file has an incorrect default export of `keypress`
// @ts-ignore
import { keypress, Listener } from "keypress.js";

const HomeScreen: React.FC = () => {
  useEffect(() => {
    const Listener: Listener = new keypress.Listener();

    Listener.simple_combo("shift s", function () {
      console.log("You pressed shift and s");
    });

    console.log(Listener.get_registered_combos());
  }, []);

  return <div>heyyy</div>;
};

export default HomeScreen;
