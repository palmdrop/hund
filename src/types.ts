export type PoemLine = string[] | null;
export type PoemLines = PoemLine[];
export type Poem = {
  lines: PoemLines;
};

export type Settings = {
  speed: number;
  pulseIterations: number;
  pulseAnimationDuration: number;
};
