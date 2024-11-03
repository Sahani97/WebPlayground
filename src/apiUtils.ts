const BASE_URL = 'https://en.wikipedia.org/w/api.php';
const PLACEHOLDER_IMAGE_URL = 'https://via.placeholder.com/200';
const FETCH_ERROR_MSG = 'Error fetching data. Please try again later.';

interface Params {
  action: string;
  page?: string;
  prop?: string;
  section?: number;
  format: string;
  origin: string;
  titles?: string;
}

interface ApiResponse {
  query?: {
    pages: {
      [key: string]: {
        imageinfo?: { url: string }[];
      };
    };
  };
  parse?: {
    wikitext: { [key: string]: string };
  };
}

// Function to fetch the bear data from Wikipedia
export const fetchBearData = async (params: Params): Promise<ApiResponse> => {
  const url = `${BASE_URL}?${new URLSearchParams(params as any).toString()}`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error('Error fetching bear data:', error);
    throw new Error(FETCH_ERROR_MSG);
  }
};

// Function to fetch the image URLs based on file names
export const fetchImageUrl = async (fileName: string): Promise<string> => {
  const imageParams = {
    action: 'query',
    titles: `File:${fileName}`,
    prop: 'imageinfo',
    iiprop: 'url', // `iiprop` direkt hinzugefügt ohne Typ-Schnittstelle
    format: 'json',
    origin: '*',
  };

  const url = `${BASE_URL}?${new URLSearchParams(imageParams as any).toString()}`;
  try {
    const res = await fetch(url);
    const data: ApiResponse = await res.json();
    const pages = data.query?.pages;
    const imageInfo = pages && Object.values(pages)[0]?.imageinfo;

    // Return image URL or placeholder if unavailable
    return imageInfo && imageInfo.length > 0
      ? imageInfo[0].url
      : PLACEHOLDER_IMAGE_URL;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return PLACEHOLDER_IMAGE_URL;
  }
};
