import photoCardTpl from '../templates/photo-card.hbs';
import PhotosApiService from './apiService';

const refs = {
  searchFormElt: document.querySelector('#search-form'),
  searchMoreButtonElt: document.querySelector('#load-more-button'),
  galleryElt: document.querySelector('.gallery'),
};

const photosApiService = new PhotosApiService();

refs.searchFormElt.addEventListener('submit', onSearch);
refs.searchMoreButtonElt.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.query.value;
  photosApiService.page = 1;
  //   photosApiService.resetPage();
  photosApiService.fetchPhotos().then(createPhotoCardMarkup);
}

function onLoadMore(e) {
  photosApiService.fetchPhotos().then(createPhotoCardMarkup);
}

function createPhotoCardMarkup(hits) {
  refs.galleryElt.insertAdjacentHTML('beforeend', photoCardTpl(hits));
}
