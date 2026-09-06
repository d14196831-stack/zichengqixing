import type { NextConfig } from 'next';
const isPages = process.env.GITHUB_PAGES === 'true';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const assetPrefix = isPages && repo && !repo.endsWith('.github.io') ? `/${repo}` : '';
const nextConfig: NextConfig = { output: 'export', assetPrefix };
export default nextConfig;
