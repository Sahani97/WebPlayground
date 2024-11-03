import { fetchImageUrl } from './apiUtils';
import { expect, test, vi } from 'vitest';
import fetch from 'node-fetch';

// Setze `fetch` in der Node-Umgebung als `any`-Typ
if (!global.fetch) {
  global.fetch = fetch as any;
}

test('fetchImageUrl returns placeholder if URL fetch fails', async () => {
  vi.spyOn(global, 'fetch').mockImplementationOnce(() =>
    Promise.reject(new Error('Network error'))
  );

  const imageUrl = await fetchImageUrl('nonexistent.jpg');
  expect(imageUrl).toBe('https://via.placeholder.com/200');

  vi.restoreAllMocks();
});
