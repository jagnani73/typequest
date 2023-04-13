export type BlockContext = {
  [id: string]: {
    binding: string;
    callback: (...args: any) => any;
    backgroundColor: string;
  };
};
