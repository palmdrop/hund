import './styles/reset.css';
import './styles/fonts.css';
import './styles/global.css';

import { poem } from './content/poem';
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js';
import LineRenderer from './components/LineRenderer';
import PoemScroller from './components/PoemScroller';

const DOG_WORD = 'HUND';

const ANIMATION_SPEED = 800;

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

// TODO: prettify this
let index = 0;
const indexedLines = lines.map(line => {
  const indexedLine = line ? ([index, line] as const) : null;
  if (line) index++;
  return indexedLine;
});

export type IndexedLines = typeof indexedLines;

const linesWithoutNull = lines.filter(Boolean) as Exclude<
  (typeof poem.lines)[number],
  null
>[][];

export default function App() {
  const [index, setIndex] = createSignal(0);

  const line = createMemo(() => {
    return linesWithoutNull[index()];
  });

  const progression = createMemo(() => {
    return index() / (linesWithoutNull.length - 1);
  });

  onMount(() => {
    const interval = setInterval(() => {
      setIndex(index => (index + 1) % linesWithoutNull.length);
    }, ANIMATION_SPEED);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <main style={`--speed: ${ANIMATION_SPEED}ms;`}>
      <div class="progress" style={`--progress: ${progression()};`} />
      <p class="line">
        <span class="start">
          <LineRenderer line={line()[0]} />
        </span>{' '}
        <span class="rest">{<LineRenderer line={line()[1]} />}</span>
      </p>
      <div class="poem">
        <PoemScroller index={index()} lines={indexedLines} />
      </div>
      <div class="sphere" />
    </main>
  );
}
