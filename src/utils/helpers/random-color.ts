const HEX_DIGITS: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const RandomColor = (): string => {
  let color: string = "#";
  for (let i = 0; i < 6; i++) color += HEX_DIGITS[getRandomNumber(0, 11)];
  return color;
};
