
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const searchParam = new URLSearchParams(search);
  const city = searchParam.get('city');
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + `/adventures/?city=${city}`);
    let response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let mainContent = document.getElementById("data");
  adventures.forEach((key) =>{
    mainContent.innerHTML += `
    <div class="col col-lg-3 mb-3">
      <a href="detail/?adventure=${key.id}" id="${key.id}">
        <div class="activity-card">
          <div class="category-banner">${key.category}</div>
          <img src=${key.image} class="card-img-top">
            <div class="card-body" style="width: 100%">
              <div class="card-text main-content">
                <span class="adventure-title">${key.name}</span>
                <span class="adventure-price">₹ ${key.costPerHead}</span>
              </div>
              <div class="card-text main-content">
                <span class="adventure-title">Duration</span>
                <span class="adventure-price">${key.duration} Hours</span>
              </div>
            </div>
        </div>
      </a>
    </div>
    `;
  });
  
  
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDuration = list.filter((item) => {
    return item.duration >= low && item.duration <= high;
  });
  return filteredDuration;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredCategory = [];
  list.filter((e) => {
    if(categoryList.includes(e.category)){
      filteredCategory.push(e);
    }
  });
  return filteredCategory;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList;
  if(filters.duration.length > 0 && filters.category.length > 0){
    let durations = filters.duration.split("-");
    filteredList = filterByDuration(list, durations[0], durations[1]);
    filteredList = filterByCategory(list, filters.category);
  }
  else if(filters.duration.length > 0){
    let durations = filters.duration.split("-");
    filteredList = filterByDuration(list, durations[0], durations[1]);
  }
  else if(filters.category.length > 0){
    filteredList = filterByCategory(list, filters.category);
  } 
  else{
    filteredList = list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let storedFilters =  JSON.parse(localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
  return storedFilters;
}

function handleBtnClose(element){
  filters["category"].splice(filters["category"].indexof(element),1)
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters["category"].length !==0){
    let categoryList = filters["category"];
    let parent = document.getElementById("category-list");

    categoryList.forEach((element)=> {
      let pill = document.createElement("div");
      pill.innerHTML =`
      <button type = "button" class = "btn btn-outline-warning" aria-label="close" onclick=handleBtnClose("${element}")>${element}</button>`;
      parent.append(pill);
    })
  }

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
