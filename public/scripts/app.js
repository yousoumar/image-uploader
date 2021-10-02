const button = document.querySelector("button");
const input = document.querySelector("input");
const dragArea = document.querySelector(".drag-area");
const container = document.querySelector(".container");
const message = document.querySelector(".message");
let imageUrl;

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragArea.style.border = "1px solid #97bef4";
  message.innerText = "Drop to upload";
});

dragArea.addEventListener("dragleave", () => {
  dragArea.style.border = "1px dashed #97bef4";
  message.innerText = "Drag & Drop your image here";
});

dragArea.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  sendFile(file);
});

button.addEventListener("click", (e) => {
  e.preventDefault();
  input.click();
});

input.addEventListener("change", () => {
  const file = input.files[0];
  sendFile(file);
});

async function sendFile(file) {
  const formData = new FormData();
  formData.append("image", file);
  const options = {
    method: "POST",
    body: formData,
  };
  container.innerHTML = `<p>Upoading ...</p>`;

  try {
    const res = await fetch("/", options);
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
      imageUrl = data.path;
      container.innerHTML = `
      <img src="/images/src/check.svg" class="check" alt="">
      <h1>Uploaded Successfully!</h1>
      <div class= "drag-area" style="border: none;">
        <img src=${data.path} alt="" class="uploaded" />     
      </div>
      <div class="link">
        <p>
          ${data.path}
        </p>
        <button class ="copy-button">Copy</button>
      </div>`;
      const button = document.querySelector(".copy-button");
      button.addEventListener("click", () => {
        navigator.clipboard.writeText(imageUrl);
        button.innerText = "Copied";
        setTimeout(() => (button.innerText = "Copy"), 1000);
      });
      console.log();
    }, 1000);
  } catch (error) {
    console.log(error);
    container.innerHTML = `<p>Something went wrong, please come back later.</p>`;
  }
}
