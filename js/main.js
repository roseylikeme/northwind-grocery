// Window Onload?
window.addEventListener('load', function () {
    console.log("Did it load?")
    //Initiate WOW JS
    new WOW().init();
    filterSelect.onchange = filterSelected;
    categorySelect.onchange = viewFilteredProducts;
})

// Show Next Dropdown / Table Depending on Select
function filterSelected() {
    if (filterSelect.value == "searchByCategory") {
        initCategoryDropdown(categorySelect);
        $("#categorySelect").removeClass("d-none");
        productTable.style.display = "none";
        productTableDisplay.style.display = "none";
    }
    else if (filterSelect.value == "viewAll") {
        viewAll();
    }
    else if (filterSelect.value == "selectOne") {
        $("#categorySelect").addClass("d-none")
        productTable.style.display = "none";
        productTableDisplay.style.display = "none";
    }
}

// 
function initCategoryDropdown(select) {
    select.length = 0;
    let option = new Option("Select a category", "select")
    select.appendChild(option);
    fetch(`http://localhost:8081/api/categories`)
    .then(response => response.json())
    .then(data => {
        for(let datum of data){
            let option = new Option(datum.name, datum.categoryId)
            select.appendChild(option);
        }
    })
}

function viewAll(){
        clearTable(productTableBody)
        $("#categorySelect").addClass("d-none")
        productTable.style.display = "block";
        productTableDisplay.style.display = "block";
        fetch(`http://localhost:8081/api/products`)
        .then(response => response.json())
        .then(data => {
            for (let datum of data) {
                let row = productTableBody.insertRow(-1);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`; // Removes extra decimals
                cell3.innerHTML = datum.productId;
            }
        })
}

function viewFilteredProducts() {
    clearTable(productTableBody)
    if(categorySelect.value == "select"){
        productTable.style.display = "none";
        productTableDisplay.style.display = "none";
    }
    else {
        productTable.style.display = "block";
        productTableDisplay.style.display = "block";
        fetch(`http://localhost:8081/api/products`)
        .then(response => response.json())
        .then(data => {
            for (let datum of data) {
                if(categorySelect.value == datum.categoryId){
                    let row = productTableBody.insertRow(-1);
                    let cell1 = row.insertCell(0);
                    let cell2 = row.insertCell(1);
                    let cell3 = row.insertCell(2);
                    cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                    cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`;
                    cell3.innerHTML = datum.productId;
                }
            }
        })
    }
}

function clearTable (table) {
    table.replaceChildren();
}