module.exports = {
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>'],

  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    'src/utils/*': 'ts-jest',
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
    //'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
  },
  modulePaths: ['/node_modules', 'src'],
  //transformIgnorePatterns: ['node_modules/(?!variables/.*)'],

  /*transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|react-navigation-tabs' +
      '|react-native-splash-screen' +
      '|react-native-screens' +
      '|react-native-reanimated' +
      ')/)',
  ],
  */
  /*transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-(native|universal|navigation)-(.*)|@react-native-community/(.*)|@react-navigation/(.*)|bs-platform|(@[a-zA-Z]+/)?(bs|reason|rescript)-(.*)+)',
  ],
  */

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/fileMocks.ts',
    '\\.(css|less)$': '<rootDir>/src/__mocks__/fileMocks.ts',
    '<rootDir>/src/utils/*.js': '<rootDir>/src/__mocks__/fileMocks.ts',
  },

  testPathIgnorePatterns: [
    '<rootDir>/src/components/EditRoadtripTemplate',
    '<rootDir>/src/utils/*.js',
  ],
}
