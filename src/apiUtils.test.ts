// src/apiUtils.test.ts
import { fetchImageUrl } from './apiUtils';
import { expect, test, vi } from 'vitest';

test('fetchImageUrl returns placeholder URL for an invalid image URL', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(() => Promise.reject(new Error('Network error')))
  );

  const imageUrl = await fetchImageUrl('invalid_image.jpg');
  expect(imageUrl).toBe('https://via.placeholder.com/200');

  vi.restoreAllMocks();
});
