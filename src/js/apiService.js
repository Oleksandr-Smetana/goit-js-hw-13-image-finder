export default class PhotosApiService {
  constructor() {
    this.searchQuery = null;
    this.page = 1;
  }

  fetchPhotos() {
    const staticUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

    console.log(this);

    fetch(
      `${staticUrl}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23038692-8ee91ca42b74ab69b2665b678`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(this);
        this.page += 1;
      });
  }

  //   get query() {
  //     return this.searchQuery;
  //   }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  //   resetPage() {
  //     this.page = 1;
  //   }
}
