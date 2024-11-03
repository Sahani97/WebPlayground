// src/apiUtils.test.ts
import { fetchImageUrl } from './apiUtils';
import { expect, test, vi } from 'vitest';

test('fetchImageUrl returns placeholder if URL fetch fails', async () => {
  vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.reject(new Error('Network error'))
  );

  const imageUrl = await fetchImageUrl('nonexistent.jpg');
  expect(imageUrl).toBe('https://via.placeholder.com/200');

  vi.restoreAllMocks();
});
