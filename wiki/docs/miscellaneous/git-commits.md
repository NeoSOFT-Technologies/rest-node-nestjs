# Git commits and pre hooks

We have added some git pre hooks while committing the code. These pre hooks are executed on every git commit.

Commit message can be bifurcated into 3 section "<Type>(<Module/Scope>): <Commit_Message>"

Type: can be anyone of them feat | bugfix | feature etc.

> Module/Scope: Module/Scope is the name of the module you are working on

Commit_Message: Actual commit message

``` git commit -m "feat(documentation): Adding documentation" ```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **chore**: Updating tasks etc; no production code change
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **sample**: A change to the samples
