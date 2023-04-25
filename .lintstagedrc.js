module.exports = {
  '*.ts': [
    'prettier --write',
    'eslint --fix'
  ],
  '*.md': [
    'prettier --write',
  ],
};
