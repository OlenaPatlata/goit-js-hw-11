import './css/styles.css';
import { FetchImagesService } from './js/fetchImagesService';
import { refs } from './js/getRefs';
import { LoadMoreBtn } from './js/load-more-btn';
import { makeImageMarkup } from './js/markupService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const fetchImagesService = new FetchImagesService();
const loadMoreBtn = new LoadMoreBtn({ selektor: '.load-more', hidden: true });
const lightbox = new SimpleLightbox('.gallery a', { captionDelay
    : 250,
});


function onSearch(e) {
    e.preventDefault();

    const currentWord = e.currentTarget.elements.searchQuery.value.trim();
    if (currentWord === '') {
        return Notify.info(`Enter a word to search for images.`);
    }
    fetchImagesService.searchQuery = currentWord;
    loadMoreBtn.show();
    fetchImagesService.resetPage();
    clearImageContainer();
    fetchImages();
}

function clearImageContainer() {
    refs.containerDiv.innerHTML = '';
}

function fetchImages() {
    loadMoreBtn.disabled();
    fetchImagesService.fetchImages().then(({data}) => {
        if (data.total === 0) {
            Notify.info(`Sorry, there are no images matching your search query: ${fetchImagesService.searchQuery}. Please try again.`);
            loadMoreBtn.hide();
            return;
        }
        appendImagesMarkup(data);
        onPageScrolling()
        lightbox.refresh();
        const { totalHits } = data;

        if (refs.containerDiv.children.length === totalHits ) {
            Notify.info(`We're sorry, but you've reached the end of search results.`);
            loadMoreBtn.hide();
        } else {
            loadMoreBtn.enable();
            Notify.success(`Hooray! We found ${totalHits} images.`);
        }
    }).catch(handleError);
}

function handleError() {
    console.log('Error!');
}

function appendImagesMarkup(data) {
    refs.containerDiv.insertAdjacentHTML('beforeend', makeImageMarkup(data));
}

//  Плавная прокрутка страницы после запроса и отрисовки каждой следующей группы изображений
function onPageScrolling(){ 
    const { height: cardHeight } = refs.containerDiv
        .firstElementChild.getBoundingClientRect();
        window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
        });
}

refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
