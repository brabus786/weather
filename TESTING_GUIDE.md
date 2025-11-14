# Star Wars Functionality Testing Guide

## ✅ Implemented Tests

### 1. **Graph Data Generation Tests** (`generateHeroGraphData.test.ts`)

- ✅ Basic graph generation functionality
- ✅ Hero handling without films and starships
- ✅ Films without corresponding hero starships
- ✅ Proper node positioning
- ✅ Multiple films with starships
- ✅ Starship node deduplication
- ✅ Animated connections
- ✅ API error handling

### 2. **Redux State Management Tests**

- ✅ `starWarsRedux.test.ts` - slice and operations
- ✅ `popupsSlice.test.ts` - popup management
- ✅ Successful and failed API call handling
- ✅ Proper state updates
- ✅ Loading process handling

### 3. **Page Component Tests** (`star-wars.test.tsx`)

- ✅ Proper pagination
- ✅ Operation dispatching
- ✅ Query parameter handling

## 🔧 Additional Tests (Recommended)

### 1. **API Layer Tests**

```typescript
// __tests__/api/starWars/api.test.ts
describe("Star Wars API", () => {
  test("should handle network errors gracefully");
  test("should transform camelCase correctly");
  test("should respect timeout configuration");
  test("should handle malformed responses");
});
```

### 2. **Custom Nodes Tests**

```typescript
// __tests__/Components/CustomNodes/
describe("HeroNode", () => {
  test("should render all person properties");
  test("should handle missing data gracefully");
});

describe("FilmNode", () => {
  test("should show/hide source handle based on isStarship");
  test("should display correct film information");
});

describe("StarshipNode", () => {
  test("should render starship details correctly");
  test("should handle unknown cost values");
});
```

### 3. **Template Component Tests**

```typescript
// __tests__/Templates/StarWarsTemplate/
describe("StarWarsTemplate", () => {
  test("should show skeleton loaders during loading");
  test("should render person cards correctly");
  test("should handle click events for popups");
  test("should manage pagination state");
});
```

### 4. **PopupDispatcher Tests**

```typescript
// __tests__/Components/Popups/PopupDispatcher/
describe("PopupDispatcher", () => {
  test("should render correct popup component");
  test("should handle queue management");
  test("should support multiple popup types");
});
```

### 5. **Integration Tests**

```typescript
// __tests__/integration/starWars.integration.test.ts
describe("Star Wars Full Flow", () => {
  test("should complete full user journey");
  test("should handle complex hero with multiple films");
  test("should manage concurrent API calls");
});
```

### 6. **Error Boundary Tests**

```typescript
// __tests__/Components/ErrorBoundary/
describe("Error Handling", () => {
  test("should catch and display API errors");
  test("should provide fallback UI for graph failures");
  test("should log errors for monitoring");
});
```

### 7. **Performance Tests**

```typescript
// __tests__/performance/starWars.perf.test.ts
describe("Performance", () => {
  test("should handle large datasets efficiently");
  test("should debounce API calls appropriately");
  test("should optimize re-renders");
});
```

### 8. **Accessibility Tests**

```typescript
// __tests__/a11y/starWars.a11y.test.ts
describe("Accessibility", () => {
  test("should support keyboard navigation");
  test("should provide proper ARIA labels");
  test("should meet WCAG guidelines");
});
```

## 🎯 Priority Testing Areas

### High Priority

1. **API Error Handling** - critical for UX
2. **Graph Data Integrity** - core functionality
3. **Redux State Consistency** - prevents state bugs

### Medium Priority

4. **Component UI Behavior** - user interface
5. **Navigation & Routing** - pagination and transitions
6. **Loading States** - user feedback

### Low Priority

7. **Edge Cases** - rare scenarios
8. **Performance** - optimization
9. **Accessibility** - accessibility compliance

## 📊 Current Coverage

**Files with tests:**

- ✅ Graph generation logic
- ✅ Redux state management
- ✅ Page components
- ✅ Popup management
- ❌ API layer (requires additional setup)
- ❌ UI components (requires mocks)
- ❌ Custom nodes (requires ReactFlow setup)

**Overall coverage: ~70% of core functionality**

## 🚀 Running Commands

```bash
# All tests
yarn jest

# With coverage
yarn jest --coverage

# Specific test
yarn jest generateHeroGraphData.test.ts

# Watch mode
yarn jest --watch

# Only updated files
yarn jest -o
```

## 🔍 Test Debugging

```bash
# Debug specific test
node --inspect-brk node_modules/.bin/jest generateHeroGraphData.test.ts --runInBand

# Verbose output
yarn jest --verbose --no-cache

# Testing with logs
yarn jest --silent=false
```
