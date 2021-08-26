import photoCardTpl from '../templates/photo-card.hbs';
import PhotosApiService from './apiService';

const refs = {
  searchFormElt: document.querySelector('#search-form'),
  loadMoreButtonElt: document.querySelector('.load-more-button'),
  galleryElt: document.querySelector('.gallery'),
};

const photosApiService = new PhotosApiService();

refs.searchFormElt.addEventListener('submit', onSearch);
refs.loadMoreButtonElt.addEventListener('click', fetchCards);

function onSearch(e) {
  e.preventDefault();

  photosApiService.query = e.currentTarget.elements.query.value;
  photosApiService.page = 1;
  //   photosApiService.resetPage();

  removePhotoCardMarkup();
  fetchCards();
}

// function onLoadMore(e) {}

function fetchCards() {
  refs.loadMoreButtonElt.disabled = true;
  refs.loadMoreButtonElt.textContent = 'Loading...';

  photosApiService.fetchPhotos().then(card => {
    createPhotoCardMarkup(card);
    refs.loadMoreButtonElt.disabled = false;
    refs.loadMoreButtonElt.textContent = 'Load more';
  });
}

function createPhotoCardMarkup(hits) {
  refs.galleryElt.insertAdjacentHTML('beforeend', photoCardTpl(hits));
}

function removePhotoCardMarkup() {
  refs.galleryElt.innerHTML = '';
}

// const element = document.getElementById('#load-more-button');
// element.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// });
