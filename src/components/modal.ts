export function renderError(message: string): void {
  const modal = document.querySelector(".modal") as HTMLDivElement;
  const msgEl = modal.querySelector(".error-message") as HTMLParagraphElement;
  const btnModalClose = modal.querySelector(
    ".btn-modal-close"
  ) as HTMLButtonElement;
  const body = document.querySelector("body") as HTMLBodyElement;

  msgEl.textContent = message;

  modal.classList.add("show");
  body.style.overflow = "hidden";

  btnModalClose.addEventListener("click", () => {
    modal.classList.remove("show");
    body.style.overflow = "auto";
  });
}
