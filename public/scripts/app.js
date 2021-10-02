const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector(".container");
let imageUrl;
button.onclick = (e) => {
  e.preventDefault();
  input.click();
};
input.onchange = async () => {
  console.log(input.files[0]);
  const formData = new FormData();
  formData.append("image", input.files[0]);
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
      <div class= "drag-area" style="border: none; border-radius: 12px;">
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
};
