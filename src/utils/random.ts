export const random = (a = 1, b?: number) => {
  const hasB = typeof b === 'number';
  const min = hasB ? a : 0;
  const max = hasB ? b : a;
  return Math.random() * (max - min) + min;
};

export const randomInt = (a = 1, b?: number) => Math.floor(random(a, b));
