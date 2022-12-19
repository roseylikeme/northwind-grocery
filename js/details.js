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
    else {
        window.location.replace("productsBS5.html")
    }
})

function showProductInfo(data) {
    const productNameField = document.getElementById("productNameField");
    const productIDField = document.getElementById("prodID");
    const productCostField = document.getElementById("prodCost");
    const productStockField = document.getElementById("prodStock");
    const productSupplyField = document.getElementById("prodSupply");
    const productDiscField = document.getElementById("prodDisc");

    productNameField.innerHTML = data.productName;
    productIDField.innerHTML = data.productId;
    productCostField.innerHTML = `$${(parseFloat(data.unitPrice)).toFixed(2)}`;
    productStockField.innerHTML = data.unitsInStock;
    productSupplyField.innerHTML = data.supplier;
    productDiscField.innerHTML = data.discontinued;
}