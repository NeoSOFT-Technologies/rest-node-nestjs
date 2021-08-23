### ESLint
`npm install --save-dev  eslint eslint-config-prettier eslint-plugin-import`

[ESLint](https://eslint.org/) is a fully pluggable tool for identifying and reporting on patterns in JavaScript.

**Configuration file**: [`.eslintrc.js`](https://github.com/smarlhens/nest7-boilerplate/blob/master/.eslintrc.js).

For more configuration options and details, see the [configuration docs](https://eslint.org/docs/user-guide/configuring).


---

### Commitlint

`npm install --save-dev @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog`

[commitlint](https://github.com/conventional-changelog/commitlint) checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

**Configuration file**: [`.commitlintrc`]

In general the pattern mostly looks like this:

```sh
type(scope?): subject  #scope is optional
```

Are you a good `commitizen` ?

---


### Husky

`npm install --save-dev husky lint-staged prettier`

[Husky](https://github.com/typicode/husky) is a package that helps you create Git hooks easily.

---
