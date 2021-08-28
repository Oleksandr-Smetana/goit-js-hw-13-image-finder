import refs from './refs';

export default function scrollOnLoadMoreButton() {
  refs.loadMoreButtonElt.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}
