import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '25712416-b7f8b21cfce49117d938a95c8';
const PARAM = 'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';

class FetchImagesService {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages () {
        try{
            const response = await axios.get(`/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAM}`);
            this.incrementPage();
            return response;
        
        } catch (error) {
            console.log(error);
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

export { FetchImagesService };


// import axios from "axios";
// axios.defaults.baseURL = 'https://pixabay.com/api';
// const API_KEY = '25712416-b7f8b21cfce49117d938a95c8';
// const PARAM = 'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';

// class FetchImagesService {
//     constructor(){
//         this.searchQuery = '';
//         this.page = 1;
//     }

//     fetchImages() {
//         return axios.get(`/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAM}`).then(data => {
//             this.incrementPage();
//             return data;
//         })
//     }

//     incrementPage() {
//         this.page += 1;
//     }

//     resetPage() {
//         this.page = 1;
//     }
// }

// export { FetchImagesService };