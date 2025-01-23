import { createEffect, For } from 'solid-js';
import { PoemData } from '~/poem/generate';
import { Poem } from './Poem';
import { renderCanvas } from '~/canvas';

type Props = {
  poems: PoemData[];
  images: string[];
};

export default function Renderer(props: Props) {
  let canvasElement: HTMLCanvasElement;

  createEffect(() => {
    setTimeout(() => {
      if (!canvasElement) return;
      renderCanvas(canvasElement, props.images);
    }, 10);
  });

  // NOTE: doing this at root level of the component, or in memo, causes hydration mismatch
  return (
    <main>
      <For each={props.poems}>{poem => <Poem poem={poem} />}</For>
      <canvas
        ref={element => {
          canvasElement = element;
        }}
      />
    </main>
  );
}
