import imagesSrc from "./gallery-items.js"


const galleryDiv = document.querySelector('.js-gallery');
const galleryList = createImages(imagesSrc);
galleryDiv.insertAdjacentHTML('beforeend',galleryList);

function createImages(images) {
		return images.map
		(({ preview, original, description }) =>
		{
			return `<li class="gallery__item">
			<a class="gallery__link"
			href="#">
			<img class= "gallery__image"
		src = "${preview}"
		alt="${description}"
		data-source="${original}"
		/>
		</a>
		</li>`
		})
		.join('');
	
};
galleryDiv.addEventListener('click', onImageClick);
const imageModal = document.querySelector('.lightbox__image');
const imageLarge = document.querySelector('.gallery__link');
const openModal = document.querySelector('.js-lightbox');

const array = [];
for (const item of imagesSrc) {
	array.push(item.original);
};
let indexOfOpenedImage = array.indexOf(imageModal.src);

function onImageClick(evt) {
	if (!evt.target.classList.contains('gallery__image')) {
		return
	}
	else {
		openModal.classList.add('is-open');
		imageModal.src = evt.target.dataset.source;
		imageModal.alt = evt.target.alt;
		window.addEventListener('keydown', onRightKeyClick);
    	window.addEventListener('keydown', onLeftKeyClick);
	onRightKeyClick(evt);
    onLeftKeyClick(evt);
  };
}
function onRightKeyClick(evt) {
  if (evt.keyCode === 39 && indexOfOpenedImage < array.length-1) {
      imageModal.src = array[indexOfOpenedImage += 1]
    }
  }
function onLeftKeyClick(evt) {
  if (evt.keyCode === 37 && indexOfOpenedImage > 0) {
      imageModal.src = array[indexOfOpenedImage -= 1]
    }
  }
function closeModal() {
	openModal.classList.remove('is-open');
	window.removeEventListener('keydown', onRightKeyClick);
	window.removeEventListener('keydown', onLeftKeyClick);
}
const onCloseBtnClick = document.querySelector('.lightbox__button');
onCloseBtnClick.addEventListener('click', closeModal);
const onOverlayClick = document.querySelector('.lightbox__overlay');
onOverlayClick.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalOnEscKeyClick);
function closeModalOnEscKeyClick(evt) {
  if (evt.keyCode === 27) {
    closeModal();
  }
}
