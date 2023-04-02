const axes = document.querySelector("#axes-div");
const oval = document.querySelector("#oval-div");

axes.addEventListener("click", (evt) => {
  evt.preventDefault();

  axes.classList.add("div");
  axes.classList.remove("option-div");
  oval.classList.remove("div");
  oval.classList.add("option-div");
});

oval.addEventListener("click", (evt) => {
  evt.preventDefault();

  axes.classList.remove("div");
  axes.classList.add("option-div");
  oval.classList.remove("option-div");
  oval.classList.add("div");
});
