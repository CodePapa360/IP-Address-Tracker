"use strict";
export function attribution() {
  const myProfile = document.querySelector(".my-profile");
  myProfile.classList.remove("hide");

  setTimeout(() => {
    myProfile.classList.add("hide");
  }, 1500);
}
