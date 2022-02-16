const API_KEY = '25712416-b7f8b21cfce49117d938a95c8';
const BASE_URL = 'https://pixabay.com/api/';

class FetchImagesService {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&${this.page}&per_page=40`;
        return fetch(url).then(response => response.json()).then(data => {
            this.incrementPage();
            return data;
        })
    }
    incrementPage() {
        this.page += 1;
    }
}

export { FetchImagesService };