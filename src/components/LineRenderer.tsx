import { For, Show } from 'solid-js';
import { DOG_WORDS } from '~/constants';
import { PoemLine } from '~/types';

const LineRenderer = (props: { line: PoemLine }) => {
  return (
    <Show when={!!props.line} fallback={<br />}>
      <For each={props?.line ?? []}>
        {part => (
          <span
            classList={{
              dog: DOG_WORDS.includes(part)
            }}
          >
            {part}
          </span>
        )}
      </For>
    </Show>
  );
};

export default LineRenderer;
