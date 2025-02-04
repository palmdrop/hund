import fs from 'fs/promises';

const POEM_DIRECTORY = './src/content';
const POEM_PATH = `${POEM_DIRECTORY}/hund.md`;

const START_REGEX = /^.*?(h|H)und\S*/g;

const parsePoem = async () => {
  const content = await fs.readFile(POEM_PATH, 'utf-8');
  let settings = undefined;

  const lines = content
    .split('\n')
    // .filter(line => !!line.trim().length)
    .map(line => {
      if (!line.trim().length) return null;

      if (line.startsWith('(')) {
        const settingsString = line.slice(1, line.length - 1);
        const settingEntries = settingsString.split(',').map(Number);
        settings = {
          speed: settingEntries[0],
          pulseIterations: settingEntries[1],
          pulseAnimationDuration: settingEntries[2]
        };

        return 'TO_REMOVE';
      }

      const start = line.match(START_REGEX)?.[0];
      const lineSettings = settings;
      settings = undefined;

      if (!start) return [line, '', lineSettings];
      return [start, line.slice(start.length).trim(), lineSettings];
    })
    .filter(line => line !== 'TO_REMOVE');

  let endingNulls = lines.length;
  do {
    if (lines[endingNulls - 1] !== null) break;
  } while (endingNulls--);

  const data = `
export const poem = {
  lines: ${JSON.stringify(lines.slice(0, endingNulls), null, 2)}
};
    `;

  await fs.writeFile(`${POEM_DIRECTORY}/poem.ts`, data);

  console.log(`Poem parsed!`);
};

parsePoem();
