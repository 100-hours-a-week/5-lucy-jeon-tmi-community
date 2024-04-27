const editBnt = document.querySelector(".edit-bnt");

editBnt.addEventListener("click", () => {
  window.location.href = "/html/post-read.html";
});

const headerImg = document.getElementById("header-img");

headerImg.addEventListener("click", () => {
  const dropDown = document.querySelector(".dropdown");
  dropDown.style.display == "block"
    ? (dropDown.style.display = "none")
    : (dropDown.style.display = "block");
});
