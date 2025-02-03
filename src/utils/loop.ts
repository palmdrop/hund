// eslint-disable-next-line no-unused-vars
export const createLoop = (rate: number, callback: (delta: number) => void) => {
  let animationFrame: number;

  let then = Date.now();

  const animate = () => {
    const now = Date.now();

    const delta = now - then;

    if (delta > rate) {
      then = now - (delta % rate);
      callback(delta);
    }

    animationFrame = requestAnimationFrame(animate);
  };

  const start = () => {
    then = Date.now();
    animate();
  };

  const stop = () => {
    cancelAnimationFrame(animationFrame);
  };

  return {
    start,
    stop
  };
};
