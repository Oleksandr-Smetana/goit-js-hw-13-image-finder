const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const API_KEY = '23038692-8ee91ca42b74ab69b2665b678';

export default class PhotosApiService {
  constructor() {
    this.searchQuery = null;
    this.page = 1;
  }

  fetchPhotos() {
    // console.log(this);

    return fetch(`${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=10&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.hits);
        this.page += 1;

        return data;
      });
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  //   get query() {
  //     return this.searchQuery;
  //   }

  //   resetPage() {
  //     this.page = 1;
  //   }
}
