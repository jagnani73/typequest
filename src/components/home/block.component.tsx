import type { BlockProps } from "../../utils/types/home.types";

const Block: React.FC<BlockProps> = ({ backgroundColor, textColor }) => {
  return (
    <article
      className="flex w-full h-full cursor-pointer"
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    />
  );
};

export default Block;
