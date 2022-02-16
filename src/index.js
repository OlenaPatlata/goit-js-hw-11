import './css/styles.css';
import { FetchImagesService } from './js/fetchImagesService';
import { refs } from './js/getRefs';


const fetchImagesService = new FetchImagesService();



function onSearch(e) {
    e.preventDefault();
    fetchImagesService.searchQuery = e.currentTarget.elements.searchQuery.value;
    console.log(fetchImagesService.searchQuery);
    fetchImagesService.fetchImages().then(data => console.log(data));
    
}

refs.formSearch.addEventListener('submit', onSearch);