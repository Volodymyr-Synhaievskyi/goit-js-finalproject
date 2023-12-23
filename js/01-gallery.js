import { galleryItems } from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const markup = galleryItems
  .map(
    ({ description, preview, original }) => `
    <li class="gallery__item">
        <a class="gallery__link" href=${original}>
            <img
                class="gallery__image"
                src=${preview}
                data-source=${original}
                alt=${description}
            />
        </a>
    </li>`
  )
  .join("");


const handleClick = (event) => {
  event.preventDefault();
  if (event.target === event.currentTarget) return;

  const link = event.target.dataset.source;

  createModal(link);
};
const createModal = (link) => {
  const opt = {
    onShow: (instance) => {
      instance.customProp = handleKeyboard.bind(instance);
      document.addEventListener("keydown", instance.customProp);
    },
    onClose: (instance) => {
      document.removeEventListener("keydown", instance.customProp);
    },
  };

  const instance = basicLightbox.create(
    `
      <img src="${link}" width="800" height="600">
  `,
    opt
  );
  instance.show();
};

function handleKeyboard(e) {
  if (e.key === "Escape") {
    this.close();
  }
}

if (!galleryRef) console.error("Gallery not found");
galleryRef.insertAdjacentHTML("afterbegin", markup);
galleryRef.addEventListener("click", handleClick);
