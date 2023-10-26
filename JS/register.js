let nameInput = document.querySelector(".nameInput");
let passInput = document.querySelector(".passInput");
let emailInput = document.querySelector(".emailInput");
let passConfirm = document.querySelector(".passConfirm");
let regBtn = document.querySelector(".reg-btn");
let form = document.querySelector("form");
let check = true;
let users = JSON.parse(localStorage.getItem("users"));

function Regis(e) {
    e.preventDefault();
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passError = document.getElementById("passError");
    let passConfirmError = document.getElementById("passConfirmError");
    check = true;
    /* Kiểm tra rỗng */
    if (nameInput.value === "") {
        nameError.textContent = "Hãy nhập tên";
        check = false;
    } else {
        nameError.textContent = "";
    }

    if (passInput.value === "") {
        passError.textContent = "Hãy nhập mật khẩu";
        check = false;
    } else {
        passError.textContent = "";
    }

    if (emailInput.value === "") {
        emailError.textContent = "Hãy nhập email";
        check = false;
    } else {
        emailError.textContent = "";
    }

    if (passConfirm.value === "") {
        passConfirmError.textContent = "Hãy xác nhận mật khẩu";
        check = false;
    } else {
        passConfirmError.textContent = "";
        if (passConfirm.value !== passInput.value) {
            passConfirmError.textContent = "Mật khẩu không khớp"
            check = false;
        } else {
            passConfirmError.textContent = ""
            // check==true;
        }
    }
    /* Kiểm tra rỗng */
    if (check) {

        if (users == null) {
            users = [];
            
        }
        let user = {
            id: users.length + 1,
            username: nameInput.value,
            password: passInput.value,
            email: emailInput.value,
            status: "Available"
        };

        if (!users) {
            users = [];
            localStorage.setItem("users", JSON.stringify(users));
        } else {
            let dupUser = users.find(
                (existingUser) => existingUser.username === nameInput.value
            );
            if (dupUser) {
                alert("Tên đã được sử dụng. Vui lòng nhập tên khác.");
                return;
            } else {
                users.push(user);
                localStorage.setItem("checked", 0);
                localStorage.setItem("users", JSON.stringify(users));
                alert("Đăng kí thành công")
                window.location.href = "login.html"
            }
        }
    }
}

/* ---------------------- */
// let users = JSON.parse(localStorage.getItem("users"));
// function Regis(e) {
//     e.preventDefault();
//     localStorage.setItem("flag", 0);
//     let usernameInput = document.getElementById("username").value;
//     let emailInput = document.getElementById("email").value;
//     let passwordInput = document.getElementById("password").value;
//     let user = {
//         username: usernameInput,
//         password: passwordInput,
//         email: emailInput,
//         status: "Available",
//     };
//     if (users == null) {
//         users = [];
//         users.push(user);
//         localStorage.setItem("users", JSON.stringify(users));
//     } else {
//         let duplicateUser = users.find(
//             (user) => user.email === emailInput
//         );
//         if (duplicateUser) {
//             alert("Email đã được sử dụng. Vui lòng nhập email khác.");
//             return;
//         } else {
//             users.push(user);
//             localStorage.setItem("users", JSON.stringify(users));
//             result.innerHTML = `
//             <div class="toast1" style="position: absolute; bottom: 700px;">
//               <div class="toast-header">
//                   <strong class="mr-auto" style="font-size:18px">Đăng ký thành công</strong>
//               </div>
//               <div class="toast-body" style="font-size:18px">
//               Xin chào !
//               </div>
//             </div>`;
//         }
//     }
// }