import './styles/reset.css';
import './styles/fonts.css';
import './styles/global.css';

import { poem } from './content/poem';
import { onMount, onCleanup, createSignal, createMemo } from 'solid-js';

export default function App() {
  const [index, setIndex] = createSignal(0);

  const line = createMemo(() => {
    return poem.lines[index()];
  });

  onMount(() => {
    const interval = setInterval(() => {
      setIndex(index => (index + 1) % poem.lines.length);
    }, 500);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <main>
      <p>
        <span class="hund">{line()[0]}</span>{' '}
        <span class="rest">{line()[1]}</span>
      </p>
    </main>
  );
}
