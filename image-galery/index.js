const image_gallery_main_container = document.querySelector('#image-gallery-main-container');
const searchBoxInput = document.querySelector('#image-gallery-header-search-box-input');
const searchBoxLens = document.querySelector('#image-gallery-header-search-box-lens');

const API_KEY = "zMp_vKYIaLpsS44S2nU7oUPgYO1HicPI1zgtQIZo5sk";

function searchImage() {

    image_gallery_main_container.innerHTML = '';

    let query = searchBoxInput.value;
    console.log('query', query);
    if (query.length == 0) {
        getTenFreeCats();
        getTenFreeDogs();
    } else {
        getUnsplashImages(query);
    }
}

function getTenFreeCats() {
    const url = `https://api.thecatapi.com/v1/images/search?limit=10`;
    fetchQuery(url);
}

function getTenFreeDogs() {
    const url = `https://api.thedogapi.com/v1/images/search?limit=10`;
    fetchQuery(url);
}

async function fetchQuery(url) {

    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);

    if (data.length > 0) {

    }

    addImages(data);
}

function addImages(results) {

    results.map(result => {
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-gallery-main-container-image');
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = result.id;

        imageBox.appendChild(image);
        image_gallery_main_container.appendChild(imageBox);
    });

}

function getUnsplashImages(query) {
    url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&tag_mode=all&orientation=landscape&client_id=${API_KEY}`;
    fetchUnsplashQuery(url);
}

async function fetchUnsplashQuery(url) {

    const response = await fetch(url);
    const data = await response.json();
    console.log('data', data);
    const answer = data.results;

    if (answer.length > 0) {
        addUnsplashImages(answer);
    } else {
        getTenFreeCats();
        getTenFreeDogs();
    }
}

function addUnsplashImages(results) {

    results.map(result => {
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-gallery-main-container-image');
        const image = document.createElement('img');
        image.src = result.urls.regular;
        image.alt = result.alt_description;

        imageBox.appendChild(image);
        image_gallery_main_container.appendChild(imageBox);
    });

}

searchBoxInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchImage();
})

searchBoxLens.addEventListener('click', searchImage);
