export interface BlockType {
  backgroundColor: string;
  textColor: string;
  binding: string;
}

export interface BlockProps {
  block: BlockType;
  selected: boolean;
  //   handleEdit: () => void;
}
