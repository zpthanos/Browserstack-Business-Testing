# GitHub Setup

## 1. Create and upload the repository

Extract the ZIP before uploading. From the extracted project directory:

```bash
git init
git add .
git commit -m "chore: add BrowserStack testing starter"
git branch -M main
git remote add origin https://github.com/ORG/REPOSITORY.git
git push -u origin main
```

Alternatively, create an empty GitHub repository and use **Add file → Upload files** to upload the
extracted files and folders. Ensure hidden directories such as `.github` are included.

## 2. Add BrowserStack secrets

In GitHub, open **Settings → Secrets and variables → Actions** and create:

| Secret                    | Value                   |
| ------------------------- | ----------------------- |
| `BROWSERSTACK_USERNAME`   | BrowserStack username   |
| `BROWSERSTACK_ACCESS_KEY` | BrowserStack access key |

Repository secrets are sufficient for a pilot. For production, create a protected GitHub
environment named `browserstack`, move the secrets to that environment, and add required reviewers
if your release-control process needs approval.

Never place either credential in `.env.example`, workflow YAML, test code, issue text, screenshots,
or test data. Rotate the access key immediately if it appears in a log or commit.

## 3. Configure branch protection

Recommended rules for `main`:

- Require a pull request.
- Require at least one approval; use two for regulated or high-risk changes.
- Require the `Repository quality / validate` check.
- Require conversation resolution.
- Block force pushes and deletion.
- Require code-owner review if your organization adds a `CODEOWNERS` file.

Do not make the paid BrowserStack job a mandatory pull-request check until capacity, execution time,
and secret behavior for external contributors are understood.

## 4. Run BrowserStack tests

Open **Actions → BrowserStack cross-browser tests → Run workflow**.

Choose:

- `target_url`: public staging URL or a URL reachable through BrowserStack Local.
- `suite`: `smoke`, `regression`, or `all`.
- `use_local`: enable for localhost, private staging, or internal networks.

The workflow updates build metadata from the repository and workflow run, executes the selected
suite, and uploads Playwright reports even when tests fail.

## 5. Optional schedule

After the pilot is stable, add a `schedule` trigger to
`.github/workflows/browserstack-tests.yml`. GitHub cron is UTC. Confirm BrowserStack parallel and
automation limits before enabling a frequent cadence.

Example for 03:00 UTC Monday through Friday:

```yaml
on:
  schedule:
    - cron: '0 3 * * 1-5'
  workflow_dispatch:
```

Scheduled workflows cannot supply manual inputs, so set a safe default target URL in workflow
environment variables or use a GitHub configuration variable such as `APP_BASE_URL`.

## 6. Verify the repository

Confirm all of the following:

- Dependabot recognizes npm and GitHub Actions ecosystems.
- A pull request runs the repository-quality workflow.
- A manual BrowserStack run creates sessions on all configured platforms.
- HTML and JUnit artifacts are downloadable from the workflow run.
- BrowserStack build grouping uses the repository and GitHub run number.
- No secrets appear in the logs or artifacts.
