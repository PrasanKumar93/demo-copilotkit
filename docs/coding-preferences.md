- Function Syntax: Use arrow functions for all function definitions. Do not use the function keyword.

- Export Pattern: Consolidate all exports into a single block at the end of the file. Do not use inline export keywords for individual variables, classes, or functions.

- Testing Strategy: Zero Mocking: Do not use mocks, stubs, or spies in unit tests.

  - Real Execution: All tests must call the actual implementation of functions and dependencies.

  - Environment: Treat unit tests as functional integration tests. Since tests run against a dedicated database and target configuration, side effects are permitted.

- No Emojis in messages while generating code

- file naming conventions as small letters separated by hyphen

- export types separately like `export type`, also import too
