import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + "/cities");
    let response = await data.json();
    return response;
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const mainDiv = document.getElementById("data");
  mainDiv.innerHTML += `
  <div class="col tile">
    <a id=${id} href="pages/adventures/?city=${id}">
      <img src=${image} class="img-responsive"/>
        <div class="tile-text">
          <b style="font-size: 20px;">${city}</b>
          <br/> <p>${description}</p>
        </div>
    </a>
  </div>
  `;

}

export { init, fetchCities, addCityToDOM };
