export interface BlockType {
  backgroundColor: string;
  binding: string;
}

export interface BlockProps {
  block: BlockType;
  selected: boolean;
  //   handleEdit: () => void;
}
