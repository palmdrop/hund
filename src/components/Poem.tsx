import { For, Show } from 'solid-js';
import { LineData, PoemData } from '~/poem/generate';

type Props = {
  poem: PoemData;
};

const Line = (props: LineData) => {
  const r = Math.random();
  return (
    <>
      <span
        classList={{
          blank: props.isBlank,
          [props.source]: true,
          line: !props.isBlank
        }}
        style={{
          '--r': r ** 3
        }}
      >
        {props.line}
      </span>
      {
        <Show when={!props.isBlank}>
          <span classList={{ separator: true, [props.source]: true }}> </span>
        </Show>
      }
    </>
  );
};

export const Poem = (props: Props) => {
  return (
    <p class="poem">
      <For each={props.poem}>
        {line =>
          line === 'newline' ? (
            <>
              <br />
              <br />
            </>
          ) : (
            <Line {...line} />
          )
        }
      </For>
    </p>
  );
};
