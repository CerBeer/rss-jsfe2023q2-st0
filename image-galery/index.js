const image_gallery_main_container = document.querySelector('#image-gallery-main-container');

function searchImage(query = '') {

    image_gallery_main_container.innerHTML = '';

    if (query === '') {
        getTenFreeCats();
        getTenFreeDogs();
    } else {
        fetchQuery(query);
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

    addImages(data);
}

function addImages(results) {

    results.map(result => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-gallery-main-container-image');
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = result.id;

        imageWrapper.appendChild(image);
        image_gallery_main_container.appendChild(imageWrapper);
    });

}

