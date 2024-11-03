import { fetchImageUrl } from './apiUtils';
import { expect, test } from 'vitest';

test('fetchImageUrl returns placeholder URL for an invalid image URL', async () => {
  // Ungültige URL übergeben
  const imageUrl = await fetchImageUrl('invalid_image.jpg');

  // Überprüfen, ob die Placeholder-URL zurückgegeben wird
  expect(imageUrl).toBe('https://via.placeholder.com/200');
});
