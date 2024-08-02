// localStorage.removeItem("products-Order-049")
/* Đăng nhập đăng xuất */
let bills = document.getElementById("bills-body");
let currentUser = JSON.parse(localStorage.getItem("currentUser"))
// console.log(currentUser);
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

/* Bills */
// const receive = JSON.parse(localStorage.getItem("receive"));
const bill11 = JSON.parse(localStorage.getItem("bills"));
let findReceive = bill11.filter((rec) => rec.username === currentUser.username)
console.log(findReceive);
let result = `<tr class="tr1">
                        <td class="td1">ID</td>
                        <td class="td1">User</td>
                        <td class="td1">Thông tin sản phẩm</td>
                        <td class="td1">Hình ảnh hàng</td>
                        <td class="td1">Price</td>
                        <td class="td1">Người nhận</td>
                        <td class="td1">Address</td>
                        <td class="td1">Phone</td>
                        
                    </tr>`

if (findReceive) {
    for (let i = 0; i < findReceive.length; i++) {
        const orderId = findReceive[i].ID;
        let products;
        products = JSON.parse(localStorage.getItem("bills")).filter(
            (item) => item.ID === orderId
        );
        // localStorage.setItem(`products-${orderId}`, JSON.stringify(products));
        localStorage.setItem(`products-${orderId}`, JSON.stringify(products));
        let cartz = findReceive[i].cart;
        const productImgs = [];
        const productNames = [];
        const quantities = [];
        let imgString = ""
        let nameString = ""
        let soluongString = ""
        for (let j = 0; j < cartz.length; j++) {
            productImgs[j] = cartz[j].img;
            imgString += `
                    <br>
                            <img width="150px" src="${productImgs[j]}"/>
                     <br>       
                        `

            productNames[j] = cartz[j].ten;
            quantities[j] = cartz[j].soluong;
            nameString += `
                <br>
                ${productNames[j]} x ${quantities[j]}
                <br>
            `

            
            // soluongString += `${quantities[j]}`


        }
        // console.log(productImgs[1],"111");
        result += `<tr>
                       <td class="td1">${orderId}</td>
                         <td class="td1">${findReceive[i].username}</td>
                        <td class="td1 td2">
                          Tên: ${nameString}
                        </td>
                        <td class="td1 td2">
                            ${imgString}
                        </td>           
                        <td class="td1">${findReceive[i].money}</td>
                        <td class="td1">${findReceive[i].tennguoinhan}</td>
                        <td class="td1">${findReceive[i].diachi}</td>
                        <td class="td1">${findReceive[i].sdt}</td>
                        
                    </tr>`

    }

    bills.innerHTML = result;

}
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


