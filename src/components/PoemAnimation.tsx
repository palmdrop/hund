import { onMount, onCleanup, createSignal, createMemo } from 'solid-js';
import LineRenderer from '../components/LineRenderer';
import PoemScroller from '../components/PoemScroller';
import { IndexedLines } from '~/app';

export default function PoemAnimation(props: {
  lines: IndexedLines;
  linesWithoutNull: string[][][];
  animationSpeed: number;
}) {
  const [index, setIndex] = createSignal(0);

  const line = createMemo(() => {
    return props.linesWithoutNull[index()];
  });

  const progression = createMemo(() => {
    return index() / (props.linesWithoutNull.length - 1);
  });

  onMount(() => {
    const interval = setInterval(() => {
      setIndex(index => (index + 1) % props.linesWithoutNull.length);
    }, props.animationSpeed);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  return (
    <main style={`--speed: ${props.animationSpeed}ms;`}>
      <div class="progress" style={`--progress: ${progression()};`} />
      <p class="active-line">
        <span class="start">
          <LineRenderer line={line()[0]} />
          <span class="emphasized correction">A</span>
        </span>{' '}
        <span class="rest">{<LineRenderer line={line()[1]} />}</span>
      </p>
      <div class="poem">
        <PoemScroller index={index()} lines={props.lines} />
      </div>
      <div class="sphere" />
    </main>
  );
}
