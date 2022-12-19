"use strict"

// Init Vars Here
const productNameField = document.getElementById("productNameField");
const productIDField = document.getElementById("prodID");
const productCostField = document.getElementById("prodCost");
const productStockField = document.getElementById("prodStock");
const productSupplyField = document.getElementById("prodSupply");
const productDiscField = document.getElementById("prodDisc");
const categoryImg = document.getElementById("categoryImgField");
const categoryArray = ["drinks", "condiments", "confections", "dairy",
                    "grains", "meats", "produce", "seafood"]

// OnLoad, init wow animations + fetch data from API
window.addEventListener('load', function(){
    new WOW().init();
    const urlParam = new URLSearchParams(location.search)
    let id = -1;
    if (urlParam.has("productId")) {
        id = urlParam.get("productId")
        if (id < 1) this.window.location.href = "productBS5.html";
        else {
            fetch(`http://localhost:8081/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                showProductInfo(data);
            })
        }
    }
})

// Once Everything is Loaded, Display Data on Page
function showProductInfo(data) {
    productNameField.innerHTML = data.productName;
    productIDField.innerHTML = data.productId;
    productCostField.innerHTML = `$${(parseFloat(data.unitPrice)).toFixed(2)}`;
    productStockField.innerHTML = data.unitsInStock;
    productSupplyField.innerHTML = data.supplier;
    categoryImg.src =`../images/categories/${categoryArray[data["categoryId"] - 1]}.jpg`

    if (data.discontinued == 'true') {
        productDiscField.innerHTML = "Sorry, this product has been discontinued."
    } else {
        productDiscField.innerHTML = "In Stock"
    }
}