import { For, Show } from 'solid-js';
import LineRenderer from './LineRenderer';
import { IndexedLines } from '~/app';

const PoemScroller = (props: { index: number; lines: IndexedLines }) => {
  return (
    <article class="poem-scroller">
      <For each={props.lines}>
        {indexedLine => (
          <p
            classList={{
              line: true,
              active: indexedLine?.[0] === props.index
            }}
          >
            <Show when={!!indexedLine} fallback={<br />}>
              {indexedLine && (
                <>
                  <LineRenderer line={indexedLine[1][0]} />{' '}
                  <LineRenderer line={indexedLine[1][1]} />
                </>
              )}
            </Show>
          </p>
        )}
      </For>
    </article>
  );
};

export default PoemScroller;
