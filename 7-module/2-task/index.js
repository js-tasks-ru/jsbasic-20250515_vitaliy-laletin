import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
            </button>
            <div class="modal__title">
          </div>
          <div class="modal__body">
        </div>
      </div>
    `);
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    });

    const closeButton = this.modal.querySelector(".modal__close");
    closeButton.addEventListener("click", (event) => {
      this.close();
    });
  }

  open () {
    document.body.append(this.modal);
    document.body.classList.add("is-modal-open");
    this.addEventListeners();
  }

  setTitle (title) {
    this.modal.querySelector(".modal__title").innerHTML = title;
  }

  setBody (node) {
    const modalBody = this.modal.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(node);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.modal.remove();
  }
}
