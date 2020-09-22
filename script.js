const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = "obhtju8Coeavh1UxNgGIKtPWNx0zYHbGS9p03cOcWmk";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if sll images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//helper function to set attributes on DOM element
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create elements for links and photos, add that to DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //create <a> to link to unslpash
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    //create <img> for photo
    const img = document.createElement("img");
    //commenting out the below lines to make the code dry
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    //put the image inside the <a>, then put both inside imageContainer  elemnt

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

getPhotos();
