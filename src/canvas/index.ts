import { random } from '~/utils/random';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const normalSettings = (context: CanvasRenderingContext2D) => {
  const blur = (4 * window.innerWidth) / 1500;
  const colorRotation = -0;
  const sepia = 100;
  const saturation = 100; // THIS IS INSANE GOO
  // const saturation = 100;
  context.fillStyle = 'white';
  context.filter = `blur(${blur}px) brightness(75%) sepia(${sepia}%) contrast(200%) hue-rotate(${colorRotation}deg) saturate(${saturation}%)`;
  context.globalAlpha = 0.55;
  context.globalCompositeOperation = 'difference';
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const gooSettings = (context: CanvasRenderingContext2D) => {
  const colorRotation = 15;
  const sepia = 100;
  const saturation = 5000;
  const blur = (5 * window.innerWidth) / 1500;
  context.fillStyle = 'green';
  context.filter = `blur(${blur}px) brightness(55%) sepia(${sepia}%) contrast(250%) hue-rotate(${colorRotation}deg) saturate(${saturation}%)`;
  context.globalAlpha = 0.65;
  context.globalCompositeOperation = 'difference';
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const neonSettings = (context: CanvasRenderingContext2D) => {
  const colorRotation = -210;
  const sepia = 90;
  const saturation = 5000;
  context.fillStyle = 'white';
  context.filter = `blur(5px) brightness(60%) sepia(${sepia}%) contrast(210%) hue-rotate(${colorRotation}deg) saturate(${saturation}%)`;
  context.globalAlpha = 0.55;
  context.globalCompositeOperation = 'hard-light';
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const neon2Settings = (context: CanvasRenderingContext2D) => {
  const colorRotation = -240;
  const sepia = 100;
  const saturation = 1000;
  context.fillStyle = 'white';
  context.filter = `blur(5px) brightness(60%) sepia(${sepia}%) contrast(210%) hue-rotate(${colorRotation}deg) saturate(${saturation}%)`;
  context.globalAlpha = 0.65;
  context.globalCompositeOperation = 'hard-light';
};

const ease = (t: number) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const adaptiveSettings = (
  context: CanvasRenderingContext2D,
  deltaY: number
) => {
  const n = ease(deltaY ** 2);
  const blur = ((3 + n * 6) * window.innerWidth) / 1500;
  const colorRotation = -10 + 60 * n;
  const sepia = 100;
  const saturation = Math.max(100 + 10000 * n - 10000 * n ** 1.5, 0);
  context.fillStyle = 'white';
  context.filter = `blur(${blur}px) brightness(65%) sepia(${sepia}%) contrast(200%) hue-rotate(${colorRotation}deg) saturate(${saturation}%)`;
  context.globalAlpha = 0.55 + 0.45 * n;
  context.globalCompositeOperation = 'difference';
};

const adaptive2Settings = (
  context: CanvasRenderingContext2D,
  deltaY: number
) => {
  // const n = ease(deltaY ** 1.5);
  const n = deltaY ** 1.5;

  const blur = (5 * window.innerWidth) / 1500;
  const colorRotation = -10;
  const sepia = 90;
  const saturation = 100 - 15 * n ** 2;
  const brightness = 75 - 25 * n ** 2;

  context.fillStyle = 'white';
  context.filter = `blur(${blur}px) brightness(${brightness}%) sepia(${sepia}%) contrast(200%) hue-rotate(${colorRotation}deg) saturate(${saturation}%)`;

  context.globalAlpha = 0.55 + 0.35 * n;
  context.globalCompositeOperation = 'difference';
};

export const renderCanvas = async (
  canvas: HTMLCanvasElement,
  images: string[]
) => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) return;

  context.fillRect(0, 0, canvas.width, canvas.height);

  const imageElements = await Promise.all(
    images.map(
      image =>
        new Promise<HTMLImageElement>(resolve => {
          const imageElement = new Image();
          imageElement.src = image;
          imageElement.onload = () => {
            resolve(imageElement);
          };
        })
    )
  );

  imageElements.forEach(async imageElement => {
    const imageWidth = width * random(0.3, 0.7);
    const imageHeight = (imageWidth / imageElement.width) * imageElement.height;

    const imageX = random(-imageWidth * 0.5, width - imageWidth * 0.5);
    const imageY = random(-imageHeight * 0.5, height - imageHeight * 0.5);

    const deltaY = (imageY + imageHeight * 0.5) / height;

    // neon2Settings(context);
    // normalSettings(context);
    //gooSettings(context);
    // adaptiveSettings(context, deltaY);
    adaptive2Settings(context, deltaY);
    context.drawImage(imageElement, imageX, imageY, imageWidth, imageHeight);
  });
};
