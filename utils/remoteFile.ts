// utils/remoteFile.ts
const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;
const REPO_OWNER = "furqanagwan";
const REPO_NAME = "furqanagwan-content";
const BRANCH = "main";
const REPO_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents`;

export async function fetchGithubApi(url: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 300 }, // 5 min revalidate! Tweak as needed
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} - ${url}`);
  return res.json();
}

export async function getRemoteMarkdownFiles(
  dir = "content",
): Promise<string[]> {
  async function traverse(folder: string): Promise<string[]> {
    const url = `${REPO_API_URL}/${folder}?ref=${BRANCH}`;
    const entries = await fetchGithubApi(url);
    return (
      await Promise.all(
        entries.map(async (entry: any) => {
          if (entry.type === "file" && entry.name.match(/\.mdx?$/)) {
            return entry.path.replace(/^content\//, ""); // strip content/ for relative
          } else if (entry.type === "dir") {
            return traverse(entry.path);
          } else {
            return [];
          }
        }),
      )
    ).flat();
  }
  return traverse(dir);
}

export async function getRemoteSource(
  filename: string,
): Promise<string | undefined> {
  const url = `${REPO_API_URL}/content/${filename}?ref=${BRANCH}`;
  try {
    const data = await fetchGithubApi(url);
    if (data.encoding === "base64" && data.content) {
      return Buffer.from(data.content, "base64").toString("utf-8");
    }
    return undefined;
  } catch (err) {
    // Optionally log
    return undefined;
  }
}
