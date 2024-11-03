import { fetchImageUrl } from './apiUtils';

interface Bear {
  name: string;
  binomial: string;
  image: string;
  range: string;
}

// Function to extract bear data from the wikitext
export const extractBears = async (wikitext: string) => {
  const speciesTables = wikitext.split('{{Species table/end}}');
  const bears: Bear[] = [];

  for (const table of speciesTables) {
    const rows = table.split('{{Species table/row');
    for (const row of rows) {
      const nameMatch = row.match(/\|name=\[\[(.*?)\]\]/);
      const binomialMatch = row.match(/\|binomial=(.*?)\n/);
      const imageMatch = row.match(/\|image=(.*?)\n/);
      const rangeMatch = row.match(/\|range=(.*?)\n/);

      if (nameMatch && binomialMatch && imageMatch && rangeMatch) {
        const fileName = imageMatch[1].trim().replace('File:', '');
        const imageUrl = await fetchImageUrl(fileName);

        const bear: Bear = {
          name: nameMatch[1],
          binomial: binomialMatch[1],
          image: imageUrl,
          range: rangeMatch[1].trim(),
        };

        bears.push(bear);
      }
    }
  }

  renderBears(bears);
};

// Function to render bear data in HTML
const renderBears = (bears: Bear[]) => {
  const moreBearsSection = document.querySelector('.more_bears');
  if (moreBearsSection) {
    moreBearsSection.innerHTML = ''; // Clear the section first
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
  }
};
