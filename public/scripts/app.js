const button = document.querySelector("button");
const input = document.querySelector("input");

button.onclick = () => {
  input.click();
};
input.onchange = () => {
  fetch("/");
};
