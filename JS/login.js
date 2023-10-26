let nameInput = document.querySelector(".nameInput");
let passInput = document.querySelector(".passInput");
let logBtn = document.querySelector(".log-btn");
let users = JSON.parse(localStorage.getItem("users"))
logBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let findUser = users.find((user) => user.username === nameInput.value && user.password === passInput.value)
    if (nameInput.value === "" || passInput.value === "") {
        alert("Vui lòng không được để trống");
        return
    }
    if (nameInput.value === "admin" && passInput.value === "admin") {
        window.location.href = "../admin/QlyUser.html"
        return;
    }
    if (findUser) {
        localStorage.setItem("currentUser", JSON.stringify(findUser));
        localStorage.setItem("checked", 1); 
        localStorage.setItem("userAcc", JSON.stringify(findUser));
        window.location.href = "index.html"

    } else {
        alert("Đăng nhập thất bại")
        localStorage.setItem("checked", 0); 
    }
    
})

/* ------------- */
