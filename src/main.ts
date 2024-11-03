import { fetchBearData } from './apiUtils';
import { extractBears } from './bearUtils';

interface Params {
  action: string;
  page: string;
  prop: string;
  section: number;
  format: string;
  origin: string;
}

// Wikipedia API parameters
const params: Params = {
  action: 'parse',
  page: 'List_of_ursids',
  prop: 'wikitext',
  section: 3,
  format: 'json',
  origin: '*',
};

// Function to fetch and display bear data
const getBearData = async () => {
  try {
    const data = await fetchBearData(params); // Use params or remove it if unnecessary
    const wikitext = data.parse?.wikitext?.['*'];
    if (wikitext) {
      await extractBears(wikitext); // add await here
    } else {
      console.error('No wikitext found in response.');
    }
  } catch (error) {
    console.error('Error getting bear data:', error);
  }
};

// Fetch and display the bear data when the page loads
getBearData();
