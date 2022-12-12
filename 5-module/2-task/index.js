function toggleText() {
  let button = document.querySelector(".toggle-text-button");
  button.addEventListener("click", () => {
    document.getElementById("text").hidden = !document.getElementById("text").hidden;
  })
}
