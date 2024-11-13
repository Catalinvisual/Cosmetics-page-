let beautyplace = document.querySelector(".beautyart");
let beautycard = document.querySelector(".beautycard");
let inputprice = document.querySelector(".inputprice");
let amount = document.querySelector(".amount");
let result = document.querySelector(".result");
let select = document.querySelector(".productselect");
let selectedBrand = "maybelline";
let selectedCategory = "bronzer";

function updateProducts(brand, category) {
  const BEAUTY_LINK = `http://makeup-ap
i.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${category}`;
  try {
    const beautyarticles = async () => {
      await fetch(BEAUTY_LINK)
        .then((response) => response.json())
        .then((json) => beauty(json));
    };
    beautyarticles();
  } catch (error) {
    console.log("The page is not working" + error);
  }
}

function beauty(json) {
  amount.addEventListener("input", inpvalue);
  function inpvalue() {
    let value1 = amount.value;
    console.log(json);
    beautyplace.innerHTML = "";
    result.innerHTML = `${value1} $`;

    json.forEach((element) => {
      let productPrice = parseFloat(element.price);

      if (productPrice < value1) {
        const colors = element.product_colors;
        const colorsShow = colors
          .map((color) => {
            return `<div class="color" style="background-color: ${color.hex_value}"></div>`;
          })
          .join("");

        // Stars rating + div stars-outer / inner
        const starsTotal = 5;
        const starsPercentage = (element.rating / starsTotal) * 100;
        console.log(starsPercentage);

        beautyplace.innerHTML += `
        <div class="card"> 
          <h2>${element.brand}</h2>
          <p>${element.product_type}</p>  
          <p>${element.id}</p>
          <div class="foto">
            <img src="${element.image_link}"></div>
          <p>${element.name}</p>
          <p class="price">${element.price} $</p>
          <div class="colors">${colorsShow}</div> 
          <div class="stars">
          <div class="stars-outer" style="width:${starsPercentage}%"></div>
          <div class="stars-inner" style="width:${starsPercentage}%"></div>
        </div>
          <p>${element.created_at}</p>
        </div>`;
      }
    });
  }
  inpvalue();
}

let brandselect = document.querySelector(".brandselect");
let categoryselect = document.querySelector(".categoryselect");

brandselect.addEventListener("change", (event) => {
  selectedBrand = event.target.value;
  updateProducts(selectedBrand, selectedCategory);
});

categoryselect.addEventListener("change", (event) => {
  selectedCategory = event.target.value;
  updateProducts(selectedBrand, selectedCategory);
});

updateProducts(selectedBrand, selectedCategory);
