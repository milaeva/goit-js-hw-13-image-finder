import refs from './refs';
import markupGalleryTpl from '../templates/galleryTpl.hbs';
import doOpenModal from './modal';

refs.gallery.addEventListener('click', doOpenModal);

const makeMarkupGallery = array => {
  refs.gallery.insertAdjacentHTML('beforeend', markupGalleryTpl(array));
};

const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

export { clearGallery, makeMarkupGallery };
