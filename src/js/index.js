import PhotosApiService from './apiService';

const refs = {
  searchFormElt: document.querySelector('#search-form'),
  searchMoreButtonElt: document.querySelector('#search-more-button'),
  galleryElt: document.querySelector('.gallery'),
};

const photosApiService = new PhotosApiService();

refs.searchFormElt.addEventListener('submit', onSearch);
refs.searchMoreButtonElt.addEventListener('click', onSearchMore);

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.query.value;
  photosApiService.page = 1;
  //   photosApiService.resetPage();
  photosApiService.fetchPhotos();
}

function onSearchMore(e) {
  photosApiService.fetchPhotos();
}
