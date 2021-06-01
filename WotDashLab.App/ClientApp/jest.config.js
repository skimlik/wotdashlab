module.exports = {
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],

  globals: {
    'ts-jest': {
      diagnostics: false,
      stringifyContentPathRegex: '\\.html$',
      astTransformers: {
        before: [
          require.resolve('jest-preset-angular/build/InlineFilesTransformer'),
          require.resolve('jest-preset-angular/build/StripStylesTransformer'),
        ],
      }
    },
  },
};
