import type { BlockProps } from "../../utils/types/home.types";

const Block: React.FC<BlockProps> = ({
  block: { backgroundColor, textColor, binding },
  selected,
}) => {
  return (
    <article
      className={`${
        selected ? "p-4" : "p-0"
      } w-full h-full cursor-pointer flex`}
    >
      <div
        className={`${
          selected ? "rounded-lg" : "rounded-none"
        } flex items-center justify-center w-full h-full`}
        style={{
          backgroundColor: backgroundColor,
          color: textColor,
        }}
      >
        <div className="text-2xl">{binding}</div>
      </div>
    </article>
  );
};

export default Block;
