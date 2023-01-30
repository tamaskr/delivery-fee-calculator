import { FREE_ITEM_LIMIT } from '../../../constants/calculator';
import { calculateItemCountSurcharge } from '../itemCount';

describe('calculateItemCountSurcharge', () => {
  test('Returns 0 for item count within the free limit', () => {
    const result = calculateItemCountSurcharge({ itemCount: FREE_ITEM_LIMIT });
    expect(result).toBe(0);
  });
});
