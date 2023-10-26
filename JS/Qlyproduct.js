const myImage = document.getElementById("image");
// Lắng nghe sự kiện onchange của input
const imageInput = document.getElementById("imgProduct");
// localStorage.setItem("hello",7)

imageInput.onchange = function (event) {
    const file = event.target.files[0];

    // Đọc tệp ảnh và chuyển đổi nó thành dữ liệu URL
    const reader = new FileReader();
    reader.onload = function (event) {
        const dataUrl = event.target.result;

        // Thiết lập nguồn ảnh của đối tượng ảnh với dữ liệu URL
        myImage.src = dataUrl;

        // Lưu dữ liệu URL vào local storage
        localStorage.setItem("myImage", dataUrl);

        // // Hiển thị ảnh
        // imgElement.src = dataUrl;
    };
    reader.readAsDataURL(file);
};
function makeCode() {
    var today = new Date();
    var day = today.getDay();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = String(today.getFullYear());
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    return (result = yyyy + mm + dd + h + m + s);
}

let listProduct = JSON.parse(localStorage.getItem("listProduct"));
function saveButton() {
    makeCode();
    let id = result;
    let nameProductInput = document.getElementById("nameProduct").value;
    let imgInput = localStorage.getItem("myImage");
    let priceProductInput = document.getElementById("priceProduct").value;
    let numberProduct = document.getElementById("sl").value;
    let product = {
        ID: id,
        img: imgInput,
        ten: nameProductInput,
        theloai: selectedValue,
        gia: priceProductInput,
        soluong: numberProduct,
    };
    let flag = JSON.parse(localStorage.getItem("flag"));
    if (flag != null) {
        listProduct.splice(flag, 1, product);
        localStorage.removeItem("flag");
        renderProduct();
        idInput = document.getElementById("aidi").value = "";
        nameProductInput = document.getElementById("nameProduct").value = "";
        priceProductInput = document.getElementById("priceProduct").value = "";
        numberProduct = document.getElementById("sl").value = "";
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
        return;
    }
    if (listProduct == null) {
        listProduct = [];
        listProduct.push(product);
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
    } else {
        listProduct.push(product);
        localStorage.setItem("listProduct", JSON.stringify(listProduct));
    }
    nameProductInput = document.getElementById("nameProduct").value = "";
    priceProductInput = document.getElementById("priceProduct").value = "";
    numberProduct = document.getElementById("sl").value = "";
    renderProduct();
}
renderProduct();

function renderProduct() {
    let total = `
          <tr class="tr1">
            <td class="td1">ID</td>
            <td class="td1">Ảnh</td>
            <td class="td1">Tên</td>
            <td class="td1">Thể loại</td>
            <td class="td1">Giá</td>
            <td class="td1">Số lượng</td>
            <td class="td1" colspan="2">Tính năng</td>
          </tr>
      `;
    for (let i = 0; i < listProduct.length; i++) {
        total += `
          <tr class="tr1">
            <td class="td1"><span class="small-id">${getRandomID(listProduct[i].ID)}</span></td>
            <td class="td1"><img src="${listProduct[i].img}" alt="${listProduct[i].ten}" width="200px" height="250px" /></td>
            <td class="td1">${listProduct[i].ten}</td>
            <td class="td1">${listProduct[i].theloai}</td>
            <td class="td1">${listProduct[i].gia}</td>
            <td class="td1">${listProduct[i].soluong}</td>
            <td class="td1"><button class="buttonNe" onclick="editButton(${i})">Edit</button></td>
            <td class="td1"><button class="buttonNe" onclick="deleteButton(${i})">Delete</button>
              </td>
          </tr>
      `;
    }
    document.getElementById("tableAdded").innerHTML = total;
}
function getRandomID() {
    let randomID = Math.floor(Math.random() * 9999999999) + 100;
    return randomID.toString().substring(0, 3);
}
function deleteButton(id) {
    listProduct.splice(id, 1);
    localStorage.setItem("listProduct", JSON.stringify(listProduct));
    renderProduct();
}
function editButton(id) {
    nameProductInput = document.getElementById("nameProduct").value =
        listProduct[id].ten;
    priceProductInput = document.getElementById("priceProduct").value =
        listProduct[id].gia;
    numberProduct = document.getElementById("sl").value = listProduct[id].soluong;
    myImage.src = listProduct[id].img;
    localStorage.setItem("flag", id);
}
function editAll() {
    let id = localStorage.getItem("flag");
    listProduct[id].ten = document.getElementById("nameProduct").value;
    listProduct[id].gia = document.getElementById("priceProduct").value;
    listProduct[id].soluong = document.getElementById("sl").value;
    const newImage = localStorage.getItem("myImage");
    if (newImage !== null) {
        listProduct[id].img = newImage;
        localStorage.removeItem("myImage");
    }

    localStorage.setItem("listProduct", JSON.stringify(listProduct));

}
function searchButton() {
    let searchValue = document.getElementById("searchProduct").value;
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));

    let total = "";
    for (let i = 0; i < listProduct.length; i++) {
        if (
            listProduct[i].ten.toLowerCase().includes(searchValue.toLowerCase()) ||
            listProduct[i].gia.includes(searchValue)
        ) {
            total += `
                  <tr class="tr1">
                    <td class="td1"><img src="${listProduct[i].img}" width="100px" height="100px"></td>
                    <td class="td1">${listProduct[i].ten}</td>
                    <td class="td1">${listProduct[i].gia}</td>
                    <td class="td1"><button class="buttonNe" onclick="editButton(${i})">Edit</button></td>
                    <td class="td1"><button class="buttonNe" onclick="deleteButton(${i})">Delete</button></td>
                  </tr>
                `;
        }
    }
    if (total.length == "") {
        document.getElementById("tableSearch").innerHTML = "Không có có sản phẩm";
    } else {
        document.getElementById("tableSearch").innerHTML = total;
    }
}

// 

// 
const storedCategory = JSON.parse(localStorage.getItem("category"));
const categorySelected = document.getElementById("categorySelect");
//
storedCategory.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    option.text = item.name;
    categorySelected.appendChild(option);
});
//
var selectedValue = ""
categorySelected.addEventListener("change", function () {
    // Lấy giá trị đã chọn
    selectedValue = categorySelected.value;
    localStorage.setItem("selectedValue", selectedValue);
    
});

//



/* Log out */
function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"
}