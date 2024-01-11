import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = new URLSearchParams(search);
  let id = adventureId.get('adventure');
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let data = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let response = await data.json();
    return response;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let { name, subtitle, images, content } = adventure;
  let title = document.getElementById("adventure-name");
  let subtile = document.getElementById("adventure-subtitle");
  let gallery = document.getElementById("photo-gallery");
  let description = document.getElementById("adventure-content");
  title.innerHTML = name;
  subtile.innerHTML = subtitle;
  images.map((image) => {
    let img = document.createElement("div");
    img.className = "col-lg-12";
    img.innerHTML = `
    <img src=${image}
    class = "activity-card-image pb-3 pb-md-0" 
    /> 
    `;
    gallery.appendChild(img);
  });
  description.innerHTML = content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photos = document.getElementById("photo-gallery");
  photos.innerHTML = `
  
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  
  `;
  
  images.map((image, index) => {
    let img = document.createElement("div");
    img.className = `carousel-item ${index === 0 ? "active" : ""}`;
    img.innerHTML = `
  <img src=${image}
  class = "activity-card-image pb-3 pb-md-0" 
  />`;
    let carousel = document.getElementById("carousel");
    carousel.appendChild(img);
  });

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-person-cost").innerHTML =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let adven = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = `${adven}`;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = config.backendEndpoint + "/reservations/new";
    let foele = form.elements;
    let info = {
      name: foele["name"].value,
      date: foele["date"].value,
      person: foele["person"].value,
      adventure: adventure.id,
    };
    try {
      let res = await fetch(data, {
        method: "POST",
        body: JSON.stringify(info),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(res.ok){
        alert("Success")
      }
      else{
        alert("Failed")
      }
    } catch (error) {
      alert("Failed to fetch");
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
