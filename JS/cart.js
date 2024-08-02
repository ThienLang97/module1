// console.log(document.getElementById("CouponCode").value,"111111");
/* Đăng nhập đăng xuất */

let currentUser = JSON.parse(localStorage.getItem("currentUser"))
let userAcc = JSON.parse(localStorage.getItem("userAcc"))
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

/* Render */

const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});

function renderCart() {
    let productCart = JSON.parse(localStorage.getItem("listProductCart"));
    let discountRate = JSON.parse(localStorage.getItem("discountRate"));
    let couCode = JSON.parse(localStorage.getItem("couCode.innerHTML"));
    // console.log(discountRate,"12345");

    if (productCart == null) {
        productCart = [];
    }
    
    let result = `
          <table width="100%">
                <thead>
                    <tr>
                        <td class="td1">Remove</td>
                        <td class="td1">Image</td>
                        <td class="td1">Product</td>
                        <td class="td1">Price</td>
                        <td class="td1">Quantity</td>
                        <td class="td1">Subtotal</td>
                    </tr>
                </thead>
        `;
    let total = 0;
    for (let i = 0; i < productCart.length; i++) {
        let currentUser = localStorage.getItem("currentUser");

        if (productCart[i].username == currentUser) {
            // let subTotal = productCart[i].soluong * productCart[i].gia;
            let subTotal =
                productCart[i].soluong *
                parseInt(productCart[i].gia.replace(/\./g, ""));
            // parseInt(productCart[i].gia.replace(/\./g, ""));
            total += subTotal;
            result += `
            <tbody>
            <tr class="tr1">
            
            <td class="td1"><i class="far fa-times-circle xoaButton" onclick="deleteButton(${i})" style="cursor: pointer;"><a href="#"></a></i></td>
        <td class="td1"><img src="${productCart[i].img}" alt="${productCart[i].ten}" width="100px" height="100px" /></td>
        <td class="td1">${productCart[i].ten}</td>
        <td class="td1">${productCart[i].gia} VNĐ</td>
        <td class="td1">
          <button class="btnQuantity" onclick="minus(${i})"> <i class="fa-solid fa-minus"></i></button>
          ${productCart[i].soluong}
          <button class="btnQuantity" onclick="plus(${i})"><i class="fa-solid fa-plus"></i></button>
        </td>
        
        <td class="td1">${subTotal} VNĐ </td>
        
      </tr>
      </tbody>
    `;
        }
    }
    
    total *= discountRate
    // let total1 = total+discountRate;
    let resultMoney = VND.format(total);
    // resultMoney += parseInt(discountRate);
    document.getElementById("cart").innerHTML = result;
    
    
    /* Tính tổng tiền */
    document.getElementById(
        "subtotal"
    ).innerHTML = `<h3>Cart Totals</h3>
                <table>
                    <tr>
                        <td>Cart Subtotal</td>
                        <td>${resultMoney}</td>
                    </tr>
                    <tr>
                        <td>Shipping</td>
                        <td>Free</td>
                    </tr>
                    <tr>
                        <td>Giảm giá</td>
                        <td id="couCode">${couCode}</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td><strong>${resultMoney}</strong></td>
                    </tr>
                    
                </table>
                <button class="normal" onclick="pay()">Kiểm tra xuất hàng</button>`;

    localStorage.setItem("totalMoney", resultMoney);

}

renderCart();
/* Dấu + */
function plus(index) {
    
    let productCart = JSON.parse(localStorage.getItem("listProductCart"));
    productCart[index].soluong++;
    localStorage.setItem("listProductCart", JSON.stringify(productCart));
    renderCart();
}

function minus(index) {
    let productCart = JSON.parse(localStorage.getItem("listProductCart"));
    if (productCart[index].soluong > 0) {
        productCart[index].soluong--;
        if (productCart[index].soluong === 0) {
            let confirm1 = confirm("Bạn có muốn xóa sản phẩm này?");
            if (confirm1) {
                productCart.splice(index, 1);
                localStorage.setItem("listProductCart", JSON.stringify(productCart));
                renderCart();
            } else {
                return;
            }
        }
    }
    localStorage.setItem("listProductCart", JSON.stringify(productCart));
    renderCart();
}
function deleteButton(index) {
    let productCart = JSON.parse(localStorage.getItem("listProductCart"));
    let confirm2 = confirm("Bạn có thích xóa khum?");
    if(confirm2){
        productCart.splice(index, 1);
        localStorage.setItem("listProductCart", JSON.stringify(productCart));

        let numberCart = JSON.parse(localStorage.getItem("numberCart"));
        numberCart--;
        localStorage.setItem("numberCart", JSON.stringify(numberCart));
        window.location.href = "../cart.html"
    }
   
    renderCart();
}
function pay() {
    document.getElementById("payInfor").style.display = "block";
    let btnCancel = document.getElementsByClassName("btnCancel")[0];
    let close = document.getElementsByClassName("close")[0];

    btnCancel.onclick = function () {
        document.getElementById("payInfor").style.display = "none";
    };
    close.onclick = function () {
        document.getElementById("payInfor").style.display = "none";
    };
}

function userpay() {
    let toUser = document.getElementById("nguoinhan").value;
    let address = document.getElementById("diachi").value;
    let phonenumber = document.getElementById("sdt").value;
    let receive = JSON.parse(localStorage.getItem("receive"));
    let currentUser = localStorage.getItem("currentUser");
    let resultMoney = localStorage.getItem("totalMoney");
    let listProductCart = localStorage.getItem("listProductCart");
    let purchaseCount = parseInt(localStorage.getItem("purchaseCount")) || 0;
    purchaseCount++;
    localStorage.setItem("purchaseCount", purchaseCount);
    let cartItems = JSON.parse(localStorage.getItem("listProductCart"));

    // console.log(cartItems.img,"111");

    const orderId = `Order-${("0000" + purchaseCount).slice(-3)}`;
    let infoReceive = {
        ID: orderId,
        cart: cartItems,
        username: userAcc.username,
        tennguoinhan: toUser,
        diachi: address,
        sdt: phonenumber,
        money: resultMoney,
        
    };
    let bills = JSON.parse(localStorage.getItem("bills")) || [];
    bills.push(infoReceive)
    localStorage.setItem("bills", JSON.stringify(bills))
    localStorage.setItem("listProductCart", JSON.stringify([]))
    
    window.location.href = "cart.html"

    if (receive == null) {
        receive = [];
        receive.push(infoReceive);
        localStorage.setItem("receive", JSON.stringify(receive));
    }
    else {
        receive.push(infoReceive);
        localStorage.setItem("receive", JSON.stringify(receive));
    }
    // for (let i = 0; i < cartItems.length; i++) {
    //     cartItems[i].orderId = orderId;
    // }
    // localStorage.setItem("listProductCart", JSON.stringify(cartItems));
    alert("Thanh toan thanh cong");

}
/* Coupon */

var discountRate = 1;
// var newDiscountRate = discountRate;
function coupon() {
    var couponCode = document.getElementById("couponCode");
    var couponData = couponCode.value
    var couCode = document.getElementById("couCode");
    if (couponData === "BETAPCODE") {
        couCode.innerHTML = "10%"
        discountRate = 0.9
        
    } else if (couponData === "BEDABIETCODE") {
        couCode.innerHTML = "20%"
        discountRate = 0.8
        
    } else if (couponData === "CODERVIPPRO") {
        couCode.innerHTML = "50%"
        discountRate = 0.5
        
    } else {
        couCode.innerHTML = "0%"
        discountRate = 1
        
    }
    localStorage.setItem("couCode.innerHTML", JSON.stringify(couCode.innerHTML))
    localStorage.setItem("discountRate", JSON.stringify(discountRate)) 
    renderCart();
    
}
coupon();

/*  */
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
