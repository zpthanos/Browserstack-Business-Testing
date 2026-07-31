import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const root = new URL('../../', import.meta.url);

test('required business and technical documentation exists', async () => {
  const requiredFiles = [
    'README.md',
    'docs/BUSINESS_READINESS_GUIDE.md',
    'docs/GITHUB_SETUP.md',
    'docs/SECURITY_AND_COMPLIANCE.md',
    'docs/TEST_OPERATIONS_RUNBOOK.md',
    'docs/TEST_PLAN_TEMPLATE.md',
  ];

  await Promise.all(requiredFiles.map((file) => access(new URL(file, root))));
});

test('package scripts expose local, BrowserStack, and validation entry points', async () => {
  const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'));

  for (const script of ['test:local', 'test:browserstack', 'validate']) {
    assert.equal(typeof packageJson.scripts[script], 'string');
  }
});
