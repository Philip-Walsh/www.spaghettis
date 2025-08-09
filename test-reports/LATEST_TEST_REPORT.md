# Test Report - 8/9/2025, 7:52:38 PM

## 📊 Summary

| Metric | Value |
|--------|-------|
| Total Tests | 93 |
| Passed | ✅ 85 |
| Failed | ❌ 8 |
| Success Rate | 91.4% |
| Coverage | N/A% |
| Overall Status | 🔴 Some tests failing |

## 📈 Recent Trends (Last 5 Runs)

| Time | Total | Passed | Success Rate | Status |
|------|-------|--------|--------------|--------|
| 16:29:38 | 93 | 48 | 52% | ❌ |
| 16:30:43 | 95 | 52 | 55% | ❌ |
| 16:46:45 | 95 | 52 | 55% | ❌ |
| 19:49:49 | 93 | 85 | 91% | 🟡 |
| 19:52:38 | 93 | 85 | 91% | 🟡 |

## Unit Tests

- **Status**: ✅ Passed
- **Tests**: 20/20 passed
- **Exit Code**: 0

## Component Tests

- **Status**: ❌ Failed
- **Tests**: 61/69 passed
- **Exit Code**: 1

### Errors:
```
(node:32898) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
FAIL tests/components/StepControls.test.jsx
  ● StepControls › calls handlers when buttons are clicked

    expect(jest.fn()).toHaveBeenCalled()

    Expected number of calls: >= 1
    Received number of calls:    0

      81 |
      82 |         fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    > 83 |         expect(handleBack).toHaveBeenCalled();
         |                            ^
      84 |
      85 |         fireEvent.click(screen.getByRole('button', { name: 'Next' }));
      86 |         expect(handleNext).toHaveBeenCalled();

      at Object.toHaveBeenCalled (tests/components/StepControls.test.jsx:83:28)

(node:32905) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to...
```

## Integration Tests

- **Status**: ✅ Passed
- **Tests**: 4/4 passed
- **Exit Code**: 0

## 🎯 Recommendations

- ❗ **8 tests failing** - Review and fix failing tests
- 📈 **Low coverage (0%)** - Add more tests to reach 60% target
- 🧩 **Component tests failing** - Check CSS module imports and component props

---
*Report generated at 8/9/2025, 7:52:38 PM*
