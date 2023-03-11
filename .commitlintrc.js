/**
 * @type {import("@commitlint/types").UserConfig}
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [2, 'always', ['lower-case', 'kebab-case']],
    'subject-case': [2, 'always', ['lower-case', 'sentence-case']],
  }
};
