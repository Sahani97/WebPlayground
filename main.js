import { fetchBearData } from './apiUtils.js';
import { extractBears } from './bearUtils.js';

// Wikipedia API parameters
const params = {
  action: "parse",
  page: "List_of_ursids",
  prop: "wikitext",
  section: 3,
  format: "json",
  origin: "*"
};

// Function to fetch and display bear data
const getBearData = async () => {
  try {
    const data = await fetchBearData(params);
    const wikitext = data.parse.wikitext['*'];
    extractBears(wikitext);
  } catch (error) {
    console.error("Error getting bear data:", error);
  }
};

// Fetch and display the bear data when the page loads
getBearData();
