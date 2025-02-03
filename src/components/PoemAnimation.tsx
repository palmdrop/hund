import { onMount, onCleanup, createSignal, createMemo } from 'solid-js';
import LineRenderer from '../components/LineRenderer';
import PoemScroller from '../components/PoemScroller';
import { IndexedLines } from '~/app';
import { createLoop } from '~/utils/loop';

// TODO: when resetting, show image as background?
export default function PoemAnimation(props: {
  lines: IndexedLines;
  linesWithoutNull: string[][][];
  animationSpeed: number;
}) {
  const [index, setIndex] = createSignal(props.linesWithoutNull.length - 2);
  const [stepClassActive, setStepClassActive] = createSignal(false);

  const [resetting, setResetting] = createSignal(false);

  const mainLoop = createLoop(props.animationSpeed, () => {
    const nextIndex = index() + 1;
    if (nextIndex < props.linesWithoutNull.length) {
      setIndex(nextIndex);
    }

    setStepClassActive(true);
    setTimeout(() => setStepClassActive(false), props.animationSpeed / 2);

    if (nextIndex === props.linesWithoutNull.length) {
      setResetting(true);
      setStepClassActive(false);

      resetLoop.start();
      return false;
    }
  });

  const resetLoop = createLoop(props.animationSpeed * 0.01, () => {
    const nextIndex = index() - 1;
    setIndex(nextIndex);

    if (nextIndex <= 0) {
      setResetting(false);
      setStepClassActive(false);
      mainLoop.start();
      return false;
    }
  });

  const line = createMemo(() => {
    return props.linesWithoutNull[index()];
  });

  const progression = createMemo(() => {
    return index() / (props.linesWithoutNull.length - 1);
  });

  onMount(() => {
    mainLoop.start();
    onCleanup(() => {
      mainLoop.stop();
      resetLoop.stop();
    });
  });

  return (
    <main
      style={`--speed: ${props.animationSpeed}ms;`}
      classList={{
        step: stepClassActive(),
        resetting: resetting()
      }}
    >
      <div
        class="progress"
        classList={{ animate: !resetting() }}
        style={`
          --progress: ${progression()}; 
        `}
      />
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
