import './styles/reset.css';
import './styles/fonts.css';
import './styles/global.css';

import PoemAnimation from './components/PoemAnimation';
// import PoemPrint from './components/PoemPrint';
import { poem } from './content/poem';

const DOG_WORD = 'HUND';
const ANIMATION_SPEED = 1500;

const splitOnDog = (text: string) => {
  const dogIndices: number[] = [];
  let index = 0;

  while (index < text.length) {
    index = text.indexOf(DOG_WORD, index);
    if (index === -1) break;
    dogIndices.push(index);
    index += DOG_WORD.length;
  }

  if (!dogIndices.length) return [text];

  const parts: string[] = [];

  let start = 0;
  for (const index of dogIndices) {
    parts.push(text.slice(start, index));
    parts.push(text.slice(index, index + DOG_WORD.length));
    start = index + DOG_WORD.length;
  }

  if (start < text.length) {
    parts.push(text.slice(start));
  }

  return parts.filter(part => !!part.length);
};

const lines = poem.lines.map(
  line => line && line.map(part => part.toUpperCase()).map(splitOnDog)
);

export type Lines = typeof lines;

// TODO: prettify this
let index = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const indexedLines = lines.map(line => {
  const indexedLine = line ? ([index, line] as const) : null;
  if (line) index++;
  return indexedLine;
});

export type IndexedLines = typeof indexedLines;

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const linesWithoutNull = lines.filter(Boolean) as Exclude<
  (typeof poem.lines)[number],
  null
>[][];

export default function App() {
  return (
    <PoemAnimation
      lines={indexedLines}
      linesWithoutNull={linesWithoutNull}
      animationSpeed={ANIMATION_SPEED}
    />
  );
  // return <PoemPrint lines={lines} />;
}
