import './css/styles.css';
import { FetchImagesService } from './js/fetchImagesService';
import { refs } from './js/getRefs';
import { LoadMoreBtn } from './js/load-more-btn';
import { makeImageMarkup } from './js/markupService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


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
        if (data.total === 0) {
            Notify.info(`Sorry, there are no images matching your search query: ${fetchImagesService.searchQuery}. Please try again.`);
            loadMoreBtn.hide();
            return;
        }
        appendImagesMarkup(data);
        loadMoreBtn.enable();
        const {totalHits}=data
        Notify.success(`Hooray! We found ${totalHits} images.`)
        // if (data.total){Notify.info('We're sorry, but you've reached the end of search results.')}
    }).catch(handleError);
    lightbox.refresh();
}

function handleError() {
    console.log('Error!');
}

function appendImagesMarkup(data) {
    refs.containerDiv.insertAdjacentHTML('beforeend', makeImageMarkup(data));
}


refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

const lightbox = new SimpleLightbox('.gallery a', { captionDelay
: 250, });