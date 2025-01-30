import { For, Show } from 'solid-js';
import LineRenderer from './LineRenderer';
import { Lines } from '~/app';

const PoemRenderer = (props: { lines: Lines }) => {
  return (
    <For each={props.lines}>
      {line => (
        <p
          classList={{
            line: true
          }}
        >
          <Show when={!!line} fallback={<br />}>
            {line && (
              <>
                <LineRenderer line={line[0]} /> <LineRenderer line={line[1]} />
              </>
            )}
          </Show>
        </p>
      )}
    </For>
  );
};

export default PoemRenderer;
