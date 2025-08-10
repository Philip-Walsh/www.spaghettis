// Unit test for custom hooks
import { renderHook, act } from '@testing-library/react';
import { useRamenBuilder } from '../../hooks/useRamenBuilder';

describe('useRamenBuilder hook', () => {
  it('initializes with empty selections', () => {
    const { result } = renderHook(() => useRamenBuilder());
    
    expect(result.current.selections).toEqual({});
    expect(result.current.total).toBe(0);
  });

  it('adds selection and updates total', () => {
    const { result } = renderHook(() => useRamenBuilder());
    
    act(() => {
      result.current.addSelection('noodleBase', { name: 'Forbidden Ramen', price: 0 });
    });
    
    expect(result.current.selections.noodleBase).toEqual('Forbidden Ramen');
    expect(result.current.total).toBe(0);
  });

  it('calculates total correctly with multiple items', () => {
    const { result } = renderHook(() => useRamenBuilder());
    
    act(() => {
      result.current.addSelection('noodleBase', { name: 'Forbidden Ramen', price: 0 });
      result.current.addSelection('protein', { name: 'Tofu', price: 1.75 });
    });
    
    expect(result.current.total).toBe(1.75);
  });
});