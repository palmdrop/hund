import './styles/reset.css';
import './styles/fonts.css';
import './styles/global.css';

import { poem } from './content/poem';
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js';

const DOG_WORD = 'HUND';

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

const lines = poem.lines.map(line =>
  line.map(part => part.toUpperCase()).map(splitOnDog)
);

console.log(lines);

export default function App() {
  const [index, setIndex] = createSignal(0);

  const line = createMemo(() => {
    return lines[index()];
  });

  onMount(() => {
    const interval = setInterval(() => {
      setIndex(index => (index + 1) % poem.lines.length);
    }, 500);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  const renderPart = (part: string[]) => {
    return part.map(part => (
      <span
        classList={{
          dog: part === DOG_WORD
        }}
      >
        {part}
      </span>
    ));
  };

  return (
    <main>
      <p class="line">
        <span class="start">{renderPart(line()[0])}</span>{' '}
        <span class="rest">{renderPart(line()[1])}</span>
      </p>
    </main>
  );
}
