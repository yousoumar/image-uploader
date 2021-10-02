const button = document.querySelector("button");
const input = document.querySelector("input");
const container = document.querySelector(".container");
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
    const res = await fetch("http://localhost:3000/", options);
    const data = await res.json();
    console.log(data);
    setTimeout(() => {
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
        <button>Copy</button>
      </div>`;
    }, 1000);
  } catch (error) {
    console.log(error);
    dragArea.innerHTML = `<p>Something went wrong, please come back later.</p>`;
  }
};
