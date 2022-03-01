const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
console.log(
  'createGlobPatternsForDependencies(__dirname)',
  createGlobPatternsForDependencies(__dirname)
);
module.exports = {
  content: [
    join(__dirname, 'pages/**/!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
