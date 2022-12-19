"use strict"

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

function showProductInfo(data) {
    const productNameField = document.getElementById("productNameField");
    const productIDField = document.getElementById("prodID");
    const productCostField = document.getElementById("prodCost");
    const productStockField = document.getElementById("prodStock");
    const productSupplyField = document.getElementById("prodSupply");
    const productDiscField = document.getElementById("prodDisc");
    const categoryImg = document.getElementById("categoryImgField");
    // Array for Category's Images
    const categoryArray = ["drinks", "condiments", "confections", "dairy",
                        "grains", "meats", "produce", "seafood"]

    productNameField.innerHTML = data.productName;
    productIDField.innerHTML = data.productId;
    productCostField.innerHTML = `$${(parseFloat(data.unitPrice)).toFixed(2)}`;
    productStockField.innerHTML = data.unitsInStock;
    productSupplyField.innerHTML = data.supplier;

    if (data.discontinued == 'true') {
        productDiscField.innerHTML = "Sorry, we no longer have this product."
    } else {
        productDiscField.innerHTML = "In Stock"
    }

    categoryImg.src =`../images/categories/${categoryArray[data["categoryId"] - 1]}.jpg`
}