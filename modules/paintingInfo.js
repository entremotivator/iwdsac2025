// Display painting info in the DOM
export const displayPaintingInfo = (info) => {
  const infoElement = document.getElementById("painting-info"); // Get the reference

  // Set the html content inside info element
  infoElement.innerHTML = `
    <h3>${info.title}</h3>
    <p><span style="font-weight: bold; padding-right: 5px;
    color:#f2c641">Artist :
    </span> <span style="font-style: italic;">${info.artist}</span></p>
    <p><span style="font-weight: bold; padding-right: 5px;
    color:#f2c641">Description:</span> <span style="font-style: italic;">
     ${info.description}</span></p>
    <p><span style="font-weight: bold; padding-right: 5px;
    color:#f2c641">Year:</span> <span style="font-style: italic;">${info.year}</span></p>
  `;
  infoElement.classList.add("show"); // Add the 'show' class
};

// Hide painting info in the DOM
export const hidePaintingInfo = () => {
  const infoElement = document.getElementById("painting-info"); // Get the reference
  infoElement.classList.remove("show"); // Remove the 'show' class
};
