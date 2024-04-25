const headerImg = document.getElementById("header-img");

headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});
