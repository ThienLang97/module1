/* Đăng nhập đăng xuất */

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
console.log(currentUser);
if (currentUser) {
    document.getElementById("login-logout").innerHTML = `<a href="index.html" id="logOutButton" style="color:red;" onclick="logOut()">Đăng xuất</a>`;
    document.getElementById("login-logout2").innerHTML = `<a href="bills.html">Xin chào, ${currentUser.username}</a>`;
} else {
    document.getElementById("login-logout").innerHTML = ` <a href="login.html">Đăng nhập</a>`
    document.getElementById("login-logout2").innerHTML = `<a href="register.html">Đăng ký</a>`;
}
function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"
}
/* Đăng nhập đăng xuất */

/* Render sản phẩm */
function renderProduct() {
    let listProduct = JSON.parse(localStorage.getItem("listProduct"));
    let productAdded = document.getElementById("product");
    for (let i = 0; i < listProduct.length; i++) {
        let result = `
          <div class="card box_img element" style="width: 18rem;">
            <img src="${
            listProduct[i].img
            }" class="card-img-top" alt="..." style=";border: 2px solid lightpink;">
            <div class="card-body">
              
              <p class="card-text name">${listProduct[i].ten}</p>
              <p class="card-text price">${listProduct[i].gia + `VNĐ`}</p>
              <button class="btn btn-primary addCart" onclick="addToCart(${listProduct[i].ID
              })">Thêm vào giỏ hàng</button>
            </div>
          </div>
      `;

        productAdded.innerHTML += result;
    }
    
}
renderProduct();
 
/* Render number cart */
function renderNumberCart() {
    let currentUser = localStorage.getItem("currentUser");
    let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
    let numberCart = 0;
    if (listProductCart) {
        for (let i = 0; i < listProductCart.length; i++) {
            if (listProductCart[i].username == currentUser) {
                numberCart++;
            }
        }
    }
    localStorage.setItem("numberCart", numberCart);
    document.getElementById("numberCart").innerHTML = numberCart;
}
document.getElementById("numberCart").innerHTML =
    localStorage.getItem("numberCart");
function addToCart(id) {
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser == null) {
        let ask = confirm("Vui lòng đăng nhập!");
        if(ask){
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 300);}
    } else {
        let listProductCart = JSON.parse(localStorage.getItem("listProductCart"));
        let listProduct = JSON.parse(localStorage.getItem("listProduct"));
        if (listProductCart == null) {
            listProductCart = [];
        }
        let flag = true;
        for (let index = 0; index < listProduct.length; index++) {
            if (listProduct[index].ID == id) {
                
                for (let i = 0; i < listProductCart.length; i++) {
                    if (
                        listProductCart[i].ID == id &&
                        listProductCart[i].username == currentUser
                    ) {
                        flag = false;
                        break;
                    }
                }
                if (!flag) {
                    alert("Sản phẩm đã có trong giỏ hàng");
                } else {
                    let productExist = false;
                    for (let i = 0; i < listProductCart.length; i++) {
                        if (listProductCart[i].ID == id) {
                            productExist = true;
                            break;
                        }
                    }
                    if (productExist) {
                        alert("Sản phẩm đã có trong giỏ hàng");
                    } else {
                        listProductCart.push(listProduct[index]);
                        listProductCart[listProductCart.length - 1].username = currentUser;
                        localStorage.setItem(
                            "listProductCart",
                            JSON.stringify(listProductCart)
                        );
                        alert("Đã thêm vào giỏ hàng"); 
                    }
                }
                break;
            }
        }
        renderNumberCart();
    }
}
/* Search function */
function search(){
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeItems = document.getElementById("product")
    const productzz = document.querySelectorAll(".card.box_img.element")
    const pname = document.getElementsByClassName("card-text name")

    for(let i = 0; i<pname.length;i++){
        let match = productzz[i].getElementsByClassName("card-text name")[0];

        if(match){
            let textvalue = match.textContent || match.innerHTML;
            if(textvalue.toUpperCase().indexOf(searchbox)>-1){
                productzz[i].style.display = "";
            }else{
                productzz[i].style.display = "none"
            }
        }
    }

}

