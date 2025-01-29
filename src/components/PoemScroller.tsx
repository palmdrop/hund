import { createEffect, For, Show } from 'solid-js';
import LineRenderer from './LineRenderer';
import { IndexedLines } from '~/app';

const PoemScroller = (props: { index: number; lines: IndexedLines }) => {
  let root: HTMLElement;
  const lines = new Map<number, HTMLParagraphElement>();

  createEffect(() => {
    const element = lines.get(props.index);
    if (!element) return;

    // TODO: only scroll IF its sufficiently close to the edge... and add some offset!
    // line.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const elementRect = element.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();

    const deltaTop = elementRect.top - rootRect.top;
    const deltaBottom = elementRect.bottom - rootRect.bottom;

    const padding = rootRect.height * 0.8;
    const scrollActivationPadding = rootRect.height * 0.1;
    // (Math.random() * 0.2 + 0.05);

    if (deltaTop < scrollActivationPadding) {
      root.scrollBy({
        top: deltaTop - padding,
        behavior: 'smooth'
      });
    } else if (deltaBottom > -scrollActivationPadding) {
      root.scrollBy({
        top: deltaBottom + padding,
        behavior: 'smooth'
      });
    }
  }, [props.index]);

  return (
    <article class="poem-scroller" ref={element => (root = element)}>
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
