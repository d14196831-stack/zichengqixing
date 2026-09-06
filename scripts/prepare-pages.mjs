import { cp, access } from 'node:fs/promises';
import path from 'node:path';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
if (process.env.GITHUB_PAGES === 'true' && repo && !repo.endsWith('.github.io')) {
  if (!/^[A-Za-z0-9._-]+$/.test(repo)) throw new Error('Invalid repository name');
  const output = path.resolve('dist/client');
  const nested = path.resolve(output, repo, '_next');
  if (!nested.startsWith(output + path.sep)) throw new Error('Invalid output path');
  await access(path.join(output, 'index.html'));
  await cp(nested, path.join(output, '_next'), { recursive: true });
}
