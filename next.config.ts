import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "1";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "comb-001";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? {
    output: "export" as const,
    basePath: `/${repositoryName}`,
    images: { unoptimized: true },
    trailingSlash: true,
  } : {}),
};

export default nextConfig;
