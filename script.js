async function fetchProducts() {
  const dataUrl = "https://dummyjson.com/products";
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error("Error");
    }
    const data = await response.json();
    console.log(data);

    const products = data.products;
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ];
    console.log(categories);
    createButtons(categories, products);
    displayProducts(products);
  } catch (error) {
    console.log("ERROR", error);
  }
  function createButtons(categories, products) {
    const buttonsDiv = document.querySelector(".buttons");
    buttonsDiv.innerHTML = "";
    categories.forEach((category) => {
      let btn = document.createElement("button");
      btn.textContent = category;
      btn.addEventListener("click", () => {
        const filteredProducts = products.filter(
          (p) => p.category === category
        );
        displayProducts(filteredProducts);
      });
      buttonsDiv.appendChild(btn);
    });
    let allBtn = document.createElement("button");
    allBtn.textContent = "Common";
    allBtn.addEventListener("click", () => displayProducts(products));
    buttonsDiv.prepend(allBtn);
  }
  function displayProducts(products) {
    const productsDiv = document.querySelector(".products");
    productsDiv.innerHTML = "";

    products.forEach((product) => {
      let div = document.createElement("div");
      div.classList.add("product");

      div.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <p>${product.price} $</p>
        `;

      productsDiv.appendChild(div);
    });
  }
}
fetchProducts();
