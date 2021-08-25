export default class PhotosApiService {
  constructor() {
    this.searchQuery = null;
    this.page = 1;
  }

  fetchPhotos() {
    const staticUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
    // console.log(this);

    return fetch(
      `${staticUrl}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23038692-8ee91ca42b74ab69b2665b678`,
    )
      .then(response => response.json())
      .then(({ hits }) => {
        // console.log(data.hits);
        this.page += 1;

        return hits;
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
