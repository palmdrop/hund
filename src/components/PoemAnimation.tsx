import { onMount, onCleanup, createSignal, createMemo } from 'solid-js';
import LineRenderer from '../components/LineRenderer';
import PoemScroller from '../components/PoemScroller';
import { IndexedLines, LinesWithoutNull } from '~/app';
import { createLoop } from '~/utils/loop';

export default function PoemAnimation(props: {
  lines: IndexedLines;
  linesWithoutNull: LinesWithoutNull;
}) {
  const [settings, setSettings] = createSignal(
    props.linesWithoutNull[0][2] ?? {
      speed: 1500,
      pulseIterations: 1,
      pulseAnimationDuration: 0.3
    }
  );

  const [index, setIndex] = createSignal(0);
  const [stepClassActive, setStepClassActive] = createSignal(false);

  const [resetting, setResetting] = createSignal(false);

  const stepPulse = () => {
    setStepClassActive(true);
    return setTimeout(() => setStepClassActive(false), settings().speed * 0.95);
  };

  const mainLoop = createLoop(settings().speed, () => {
    const nextIndex = index() + 1;
    if (nextIndex < props.linesWithoutNull.length) {
      setIndex(nextIndex);

      const [, , nextSettings] = props.linesWithoutNull[nextIndex];
      if (nextSettings) {
        setSettings(nextSettings);
        mainLoop.setRate(nextSettings.speed);
      }
    }

    const stepTimeout = stepPulse();

    if (nextIndex === props.linesWithoutNull.length) {
      setResetting(true);
      clearTimeout(stepTimeout);
      setStepClassActive(false);

      resetLoop.start();
      return false;
    }
  });

  const resetLoop = createLoop(1, () => {
    const nextIndex = index() - 1;
    setIndex(nextIndex);

    if (nextIndex <= 0) {
      setResetting(false);
      stepPulse();

      const [, , firstSettings] = props.linesWithoutNull[0];
      mainLoop.setRate(firstSettings?.speed ?? 1500);

      if (firstSettings) {
        setSettings(firstSettings);
      }

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
      style={`
        --speed: ${settings().speed}ms;
        --pulse-animation-duration: ${settings().pulseAnimationDuration};
        --pulse-iterations: ${settings().pulseIterations};
      `}
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
