const image_gallery_main_container = document.querySelector('#image-gallery-main-container');
const searchBoxInput = document.querySelector('#image-gallery-header-search-box-input');
const searchBoxLens = document.querySelector('#image-gallery-header-search-box-lens');
const searchBoxClean = document.querySelector('#image-gallery-header-search-box-clear');
const topHr = document.querySelector('.image-gallery-top-hr-anno');

const API_KEY = "";

const settingsAPI = {
    thecatapi: {
        getURL: function () {return `https://api.thecatapi.com/v1/images/search?limit=10`;},
        getANS: function (data) {return data;},
        getSRC: function (data) {return data.url;},
        getALT: function (data) {return data.id;},
        setVisibleAnn: function (flagLength) {if (flagLength === 0) topHr.classList.add('none'); else topHr.classList.remove('none');}
    },
    thedogapi: {
        getURL: function () {return `https://api.thedogapi.com/v1/images/search?limit=10`;},
        getANS: function (data) {return data;},
        getSRC: function (data) {return data.url;},
        getALT: function (data) {return data.id;},
        setVisibleAnn: function (flagLength) {if (flagLength === 0) topHr.classList.add('none'); else topHr.classList.remove('none');}
    },
    unsplash: {
        getURL: function (query) {return `https://api.unsplash.com/search/photos?query=${query}&per_page=12&tag_mode=all&orientation=landscape&client_id=${API_KEY}`;},
        getANS: function (data) {return data.results;},
        getSRC: function (data) {return data.urls.regular;},
        getALT: function (data) {return data.alt_description;},
        setVisibleAnn: function (flagLength) {if (flagLength === 0) topHr.classList.remove('none'); else topHr.classList.add('none');}
    }
};

function searchImage() {

    image_gallery_main_container.innerHTML = '';

    let query = searchBoxInput.value;
    if (query.length === 0) {
        fetchQuery(settingsAPI.thecatapi, query);
        fetchQuery(settingsAPI.thedogapi, query);
    } else {
        fetchQuery(settingsAPI.unsplash, query);
    }
}

async function fetchQuery(api, query) {

    const response = await fetch(api.getURL(query));
    const data = await response.json();
    const answer = api.getANS(data);

    if (answer.length > 0) {
        api.setVisibleAnn(query.length);
        addImages(answer, api);
    } else {
        fetchQuery(settingsAPI.thecatapi, query);
        fetchQuery(settingsAPI.thedogapi, query);
    }

}

function addImages(results, api) {

    results.map(result => {
        const imageBox = document.createElement('div');
        imageBox.classList.add('image-gallery-main-container-image');

        const imageBoxIn = document.createElement('div');
        imageBoxIn.classList.add('image-gallery-main-containerIn-image');

        const image = document.createElement('img');
        image.classList.add('image-gallery-main-container-image-image');
        image.src = api.getSRC(result);
        image.alt = api.getALT(result);

        imageBoxIn.appendChild(image);
        imageBox.appendChild(imageBoxIn);
        image_gallery_main_container.appendChild(imageBox);
    });

}

function modal_windows_OpenClose(e) {
    if (modalElement !== undefined) {
        modalElement.classList.remove('modal-windows-window-image');
        modalElement = undefined;
    } else {
        const target = e.target;
        if (target.classList.contains('image-gallery-main-container-image-image')) {
            const parent = target.parentNode;
            parent.classList.add('modal-windows-window-image');
            modalElement = parent;
        }
    }
}

searchBoxInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchImage();
})

let modalElement = undefined;

searchBoxLens.addEventListener('click', searchImage);

document.addEventListener('mousedown', modal_windows_OpenClose);
