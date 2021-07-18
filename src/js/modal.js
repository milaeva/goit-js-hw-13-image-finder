import * as basicLightbox from 'basiclightbox';

const instance = basicLightbox.create(`
    <div class="modal hidden">
        <img data-modal="largeImage" src="" alt="" />
    </div>
`);

const doOpenModal = e => {
  const imageTargetRef = e.target;
  if (!imageTargetRef.classList.contains('gallery__image')) {
    return;
  }
  instance.show();
  const modalImage = document.querySelector('[data-modal="largeImage"]');
  modalImage.src = imageTargetRef.dataset.largeimage;
};

export default doOpenModal;
