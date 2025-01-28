import { createEffect, For, Show } from 'solid-js';
import LineRenderer from './LineRenderer';
import { IndexedLines } from '~/app';

const PoemScroller = (props: { index: number; lines: IndexedLines }) => {
  const lines = new Map<number, HTMLParagraphElement>();

  createEffect(() => {
    const line = lines.get(props.index);
    if (!line) return;

    // TODO: only scroll IF its sufficiently close to the edge... and add some offset!
    line.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [props.index]);

  return (
    <article class="poem-scroller">
      <For each={props.lines}>
        {indexedLine => (
          <p
            classList={{
              line: true,
              active: indexedLine?.[0] === props.index
            }}
            ref={element => {
              if (!element || !indexedLine) return;
              lines.set(indexedLine?.[0], element);
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
