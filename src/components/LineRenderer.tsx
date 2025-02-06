import { For, Show } from 'solid-js';
import { DOG_WORDS } from '~/constants';
import { PoemLine } from '~/types';

const LineRenderer = (props: { line: PoemLine }) => {
  return (
    <Show when={!!props.line} fallback={<br />}>
      <For each={props?.line ?? []}>
        {part => {
          const isDog = DOG_WORDS.includes(part);
          return (
            <span
              classList={{
                dog: isDog,
                emphasized: isDog
              }}
            >
              {part}
            </span>
          );
        }}
      </For>
    </Show>
  );
};

export default LineRenderer;
