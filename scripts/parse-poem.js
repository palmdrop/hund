import fs from 'fs/promises';

const POEM_DIRECTORY = './src/content';
const POEM_PATH = `${POEM_DIRECTORY}/hund.md`;

const START_REGEX = /^.*?(h|H)und\S*/g;

const parsePoem = async () => {
  const content = await fs.readFile(POEM_PATH, 'utf-8');
  const lines = content
    .split('\n')
    // .filter(line => !!line.trim().length)
    .map(line => {
      if (!line.trim().length) return null;
      const start = line.match(START_REGEX)?.[0];
      if (!start) return [line, ''];

      return [start, line.slice(start.length).trim()];
    });

  const data = `
export const poem = {
  lines: ${JSON.stringify(lines, null, 2)}
};
    `;

  await fs.writeFile(`${POEM_DIRECTORY}/poem.ts`, data);

  console.log(`Poem parsed!`);
};

parsePoem();
