import { readFile, writeFile } from 'node:fs/promises';
import { parseArgs } from 'node:util';

import YAML from 'yaml';

const { values } = parseArgs({
  options: {
    local: { type: 'string' },
    'project-name': { type: 'string' },
    'build-name': { type: 'string' },
    'build-identifier': { type: 'string' },
    'dry-run': { type: 'boolean', default: false },
  },
  strict: true,
});

function readBoolean(value, fallback) {
  if (value === undefined) return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error('--local must be either true or false');
}

function sanitizeName(value, fallback) {
  const candidate = value?.trim() || fallback;
  return candidate.replace(/[^A-Za-z0-9_:\[\]-]/g, '_').slice(0, 255);
}

const configPath = new URL('../browserstack.yml', import.meta.url);
const config = YAML.parse(await readFile(configPath, 'utf8'));

config.browserstackLocal = readBoolean(values.local, Boolean(config.browserstackLocal));
config.projectName = sanitizeName(values['project-name'], config.projectName);
config.buildName = sanitizeName(values['build-name'], config.buildName);
config.buildIdentifier = sanitizeName(values['build-identifier'], config.buildIdentifier);

const output = YAML.stringify(config, { lineWidth: 100 });

if (values['dry-run']) {
  process.stdout.write(output);
} else {
  await writeFile(configPath, output, 'utf8');
  process.stdout.write(
    `BrowserStack configuration updated (local=${String(config.browserstackLocal)}).\n`,
  );
}
