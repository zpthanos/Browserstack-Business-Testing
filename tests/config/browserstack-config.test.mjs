import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import YAML from 'yaml';

const configPath = new URL('../../browserstack.yml', import.meta.url);

test('BrowserStack config has a safe, representative platform matrix', async () => {
  const source = await readFile(configPath, 'utf8');
  const config = YAML.parse(source);

  assert.equal(config.framework, 'playwright');
  assert.ok(Array.isArray(config.platforms));
  assert.ok(config.platforms.length >= 3);
  assert.ok(config.platforms.some((platform) => platform.browserName === 'chrome'));
  assert.ok(config.platforms.some((platform) => platform.browserName === 'playwright-webkit'));
  assert.ok(config.platforms.some((platform) => platform.browserName === 'playwright-firefox'));
  assert.equal(typeof config.browserstackLocal, 'boolean');
});

test('BrowserStack config never contains committed credentials', async () => {
  const source = await readFile(configPath, 'utf8');
  const config = YAML.parse(source);

  assert.equal(config.userName, undefined);
  assert.equal(config.accessKey, undefined);
  assert.doesNotMatch(source, /your_access_key|your_username/i);
});
