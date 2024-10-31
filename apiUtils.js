// apiUtils.js
const BASE_URL = "https://en.wikipedia.org/w/api.php";
const PLACEHOLDER_IMAGE_URL = "https://via.placeholder.com/200";
const FETCH_ERROR_MSG = "Error fetching data. Please try again later.";


// Function to fetch the bear data from Wikipedia
export const fetchBearData = async (params) => {
  const url = `${BASE_URL}?${new URLSearchParams(params).toString()}`;
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("Error fetching bear data:", error);
    throw new Error(FETCH_ERROR_MSG);
  }
};

// Function to fetch the image URLs based on file names
export const fetchImageUrl = async (fileName) => {
  const imageParams = {
    action: "query",
    titles: `File:${fileName}`,
    prop: "imageinfo",
    iiprop: "url",
    format: "json",
    origin: "*"
  };

  const url = `${BASE_URL}?${new URLSearchParams(imageParams).toString()}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const imageInfo = Object.values(pages)[0].imageinfo;

    // Return image URL or placeholder if unavailable
    return imageInfo && imageInfo.length > 0 ? imageInfo[0].url : PLACEHOLDER_IMAGE_URL;
  } catch (error) {
    console.error("Error fetching image URL:", error);
    return PLACEHOLDER_IMAGE_URL;
  }
};
