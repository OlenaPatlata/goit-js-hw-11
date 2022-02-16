import './css/styles.css';
import { FetchImagesService } from './js/fetchImagesService';
import { refs } from './js/getRefs';
import { LoadMoreBtn } from './js/load-more-btn';
import { makeImageMarkup } from './js/markupService';


const fetchImagesService = new FetchImagesService();
const loadMoreBtn = new LoadMoreBtn({selektor: '.load-more', hidden: true});


function onSearch(e) {
    e.preventDefault();

    fetchImagesService.searchQuery = e.currentTarget.elements.searchQuery.value;
    loadMoreBtn.show();
    fetchImagesService.resetPage();
    clearImageContainer();
    fetchImages();
}

function clearImageContainer() {
    refs.containerDiv.innerHTML = '';
}

function fetchImages() {
    loadMoreBtn.disable();
    fetchImagesService.fetchImages().then(data => {
        appendImagesMarkup(data);
        loadMoreBtn.enable();
    }).catch(handleError);
}

function handleError() {
    console.log('Error!');
}

function appendImagesMarkup(data) {
    refs.containerDiv.insertAdjacentHTML('beforeend', makeImageMarkup(data));
}


refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
