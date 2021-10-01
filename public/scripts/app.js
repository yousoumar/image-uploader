const form = document.querySelector("form");
const button = document.querySelector("button");
const input = document.querySelector("input");

button.onclick = (e) => {
  e.preventDefault();
  input.click();
};
input.onchange = () => {
  form.submit();
};
