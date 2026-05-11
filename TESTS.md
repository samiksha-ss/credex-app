# Automated Tests

We use `vitest` for our automated testing suite. The tests primarily focus on the deterministic `AuditEngine` to ensure financial recommendations are accurate.

## 1. Engine Core Logic (`src/core/engine/__tests__/engine.test.ts`)
This file contains the core unit tests for the audit engine.

### Tests Covered:
- **"identifies seat overprovisioning"**: Tests if the engine correctly flags when the number of paid seats exceeds the reported team size.
- **"recommends downgrades for small teams on enterprise plans"**: Ensures that a team of 2 on an Enterprise tier is recommended to downgrade to a Team or Pro tier.
- **"identifies cheaper alternatives"**: Tests if the engine successfully recommends switching from a more expensive tool to a cheaper alternative (e.g., ChatGPT Enterprise to Claude Team) if the savings meet the threshold.
- **"calculates annual billing savings"**: Verifies that the engine correctly identifies savings when switching from monthly to annual billing for supported tools.
- **"calculates efficiency score correctly"**: Ensures the mathematical formula for the 0-100 efficiency score works accurately based on total spend vs potential savings.

## How to run the tests:
1. Ensure dependencies are installed: `npm install`
2. Run the test suite: `npm run test`
3. For watch mode during development: `npm run test:watch`
