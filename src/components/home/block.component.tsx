import type { BlockProps } from "../../utils/types/home.types";
import { useBlockSettings } from "../../utils/store";

const Block: React.FC<BlockProps> = ({ id, selected }) => {
  const { blockSettings } = useBlockSettings();

  return (
    <article
      className={`${
        selected ? "p-4" : "p-0"
      } w-full h-full cursor-pointer flex`}
    >
      <div
        className={`${
          selected ? "rounded-lg shadow-lg shadow-black" : "rounded-none"
        } flex items-center justify-center w-full h-full`}
        style={{
          backgroundColor: blockSettings[id].backgroundColor,
        }}
      >
        <div
          className="text-2xl font-bold"
          style={{
            mixBlendMode: "difference",
            color: "white",
          }}
        >
          {blockSettings[id].binding.replaceAll(" ", " + ")}
        </div>
      </div>
    </article>
  );
};

export default Block;
