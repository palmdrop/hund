import { Lines } from '~/app';
import PoemRenderer from './PoemRenderer';

import '../styles/print.css';

// import image from '../images/strand1.jpg';

const src =
  'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const PoemPrint = (props: { lines: Lines }) => {
  return (
    <main class="print">
      <div class="print-image">
        <img src={src} />
      </div>
      <div class="small-sphere"></div>
      <div class="print-poem">
        <PoemRenderer lines={props.lines} />
      </div>
    </main>
  );
};

export default PoemPrint;
