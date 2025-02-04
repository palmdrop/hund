export const createLoop = (
  rate: number,
  // eslint-disable-next-line no-unused-vars
  callback: (delta: number) => void | boolean
) => {
  let animationFrame: number;

  let then = Date.now();

  const animate = () => {
    const now = Date.now();

    const delta = now - then;

    if (delta > rate) {
      then = now - (delta % rate);
      const result = callback(delta);
      if (typeof result === 'boolean' && !result) return;
    }

    animationFrame = requestAnimationFrame(animate);
  };

  const stop = () => {
    if (!animationFrame) return;
    cancelAnimationFrame(animationFrame);
  };

  const start = () => {
    stop();
    then = Date.now();
    animate();
  };

  const setRate = (newRate: number) => {
    rate = newRate;
  };

  return {
    start,
    stop,
    setRate
  };
};
