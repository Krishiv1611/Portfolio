const githubHeaders = {
  "User-Agent": "Krishiv-portfolio-audit"
};

const github = await fetch("https://api.github.com/users/Krishiv1611", {
  headers: githubHeaders
}).then((response) => response.json());

const repositories = await fetch(
  "https://api.github.com/users/Krishiv1611/repos?per_page=100&type=owner&sort=updated",
  { headers: githubHeaders }
).then((response) => response.json());

const profileHtml = await fetch("https://github.com/Krishiv1611", {
  headers: githubHeaders
}).then((response) => response.text());
const pinnedStart = profileHtml.indexOf("js-pinned-items-reorder-list");
const pinnedEnd = profileHtml.indexOf("</ol>", pinnedStart);
const pinnedHtml =
  pinnedStart >= 0 && pinnedEnd >= 0 ? profileHtml.slice(pinnedStart, pinnedEnd) : "";
const pinned = [
  ...pinnedHtml.matchAll(/href="\/Krishiv1611\/([^"]+)"/g)
]
  .map((match) => match[1])
  .filter((value, index, values) => values.indexOf(value) === index);

const leetcode = await fetch("https://leetcode.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Referer: "https://leetcode.com/u/krishivarora25/"
  },
  body: JSON.stringify({
    variables: { username: "krishivarora25" },
    query: `
      query portfolioAudit($username: String!) {
        matchedUser(username: $username) {
          username
          profile { ranking }
          submitStatsGlobal {
            acSubmissionNum { difficulty count }
          }
          submissionCalendar
        }
        userContestRanking(username: $username) {
          rating
          globalRanking
          attendedContestsCount
        }
      }
    `
  })
}).then((response) => response.json());

console.log(
  JSON.stringify(
    {
      github: {
        login: github.login,
        name: github.name,
        bio: github.bio,
        publicRepos: github.public_repos,
        followers: github.followers,
        createdAt: github.created_at,
        pinned,
        repos: repositories
          .filter((repository) => !repository.private && !repository.fork && !repository.archived)
          .map((repository) => ({
            name: repository.name,
            description: repository.description,
            language: repository.language,
            stars: repository.stargazers_count,
            forks: repository.forks_count,
            updatedAt: repository.updated_at,
            homepage: repository.homepage
          }))
      },
      leetcode: leetcode.data
    },
    null,
    2
  )
);
