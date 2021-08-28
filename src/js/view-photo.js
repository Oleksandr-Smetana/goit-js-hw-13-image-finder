import * as basicLightbox from 'basiclightbox';
import '../css/basicLightbox.css';

export default function viewPhoto(e) {
  const targetImage = e.target;
  //   console.dir(targetImage);
  if (targetImage.classList.contains('image')) {
    const instance = basicLightbox.create(
      `<img src="${targetImage.dataset.source}" alt="${targetImage.alt}" class="image"/>`,
    );
    instance.show();
  }
}
