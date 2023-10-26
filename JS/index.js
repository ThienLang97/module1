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