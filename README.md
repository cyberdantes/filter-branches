# sync-branches-pr

GitHub Action to return branchs list filtered separated by comma.

## Inputs

### `GITHUB_TOKEN`

**Required** The token to be used for creating the pull request. Can be set to the one given for the workflow or another user.

### `TARGET_BRANCH_STARTS_WITH`

**Required** The branchs you want to make the pull request to.

## Outputs

### `LIST`

Set to the URL of either the pull request that was opened by this action or the one that was found to already be open between the two branches.

### Example

```yml
name: Sync
on:
  push:
    branches:
      - master

jobs:
  sync-branches:
    runs-on: ubuntu-20.04
    name: Syncing branches
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Set up Node
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Sync Branches PR
        uses: cyberdantes/filter-branches@1
        with:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          TARGET_BRANCH_STARTS_WITH: "feature/"
```
