import type { BlockProps } from "../../utils/types/home.types";

const Block: React.FC<BlockProps> = ({
  backgroundColor,
  binding,
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
          selected ? "rounded-lg shadow-lg shadow-black" : "rounded-none"
        } flex items-center justify-center w-full h-full`}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div
          className="text-2xl font-bold"
          style={{
            mixBlendMode: "difference",
            color: "white",
          }}
        >
          {binding.replaceAll(" ", " + ")}
        </div>
      </div>
    </article>
  );
};

export default Block;
