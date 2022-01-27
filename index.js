const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  try {
    const targetBranchPattern = core.getInput("TARGET_BRANCH_STARTS_WITH", {
      required: true,
    });
    const githubToken = core.getInput("GITHUB_TOKEN", { required: true });

    const {
      payload: { repository },
    } = github.context;

    const octokit = new github.GitHub(githubToken);
    const { data: targetBranches } = await octokit.git.listMatchingRefs({
      owner: repository.owner.login,
      repo: repository.name,
      ref: `heads/${targetBranchPattern}`,
    });

    const branchNames = [];
    for (let branchData of targetBranches) {
      const branch = branchData.ref.replace("refs/heads/", "");
      branchNames.push(branch);      
    }
    
    core.setOutput("LIST", branchNames.join());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
