import { fetchImageUrl } from './apiUtils.js';

// Function to extract bear data from the wikitext
export const extractBears = (wikitext) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears = [];

  speciesTables.forEach((table) => {
    const rows = table.split('{{Species table/row');
    rows.forEach(async (row) => {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/); // Extract range

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');

        // Fetch image URL and add the bear data to the list
        const imageUrl = await fetchImageUrl(fileName);
        const bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch[1].trim() // Extracted range
        };

        bears.push(bear);

        if (bears.length === rows.length) {
          renderBears(bears);
        }
      }
    });
  });
};

// Function to render bear data in HTML
const renderBears = (bears) => {
  const moreBearsSection = document.querySelector('.more_bears');
  moreBearsSection.innerHTML = ''; // Clear the section first
  
  // Use DocumentFragment to minimize reflows
  const fragment = document.createDocumentFragment();
  bears.forEach((bear) => {
    const bearDiv = document.createElement('div');
    bearDiv.innerHTML = `
      <h3>${bear.name} (${bear.binomial})</h3>
      <img src="${bear.image}" alt="${bear.name}" style="width:200px; height:auto;">
      <p><strong>Range:</strong> ${bear.range}</p>
    `;
    fragment.appendChild(bearDiv);
  });
  moreBearsSection.appendChild(fragment);
};

