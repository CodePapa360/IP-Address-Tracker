export function renderError(message) {
  const modal = document.querySelector(".modal");
  const msgEl = modal.querySelector(".error-message");
  const btnModalClose = modal.querySelector(".btn-modal-close");
  const body = document.querySelector("body");

  msgEl.textContent = message;

  modal.classList.add("show");
  body.style.overflow = "hidden";

  btnModalClose.addEventListener("click", function () {
    modal.classList.remove("show");
    body.style.overflow = "auto";
  });
}
