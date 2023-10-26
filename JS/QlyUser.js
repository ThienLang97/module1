function renderUser() {
    let users = JSON.parse(localStorage.getItem("users"));
    let result = `
    <tr class="tr1">
      <td class="td1">Email</td>
      <td class="td1">Tên người dùng</td>
      <td class="td1" colspan="2">Tính năng</td>
      <td class="td1" colspan="2">Trạng thái</td>
    </tr>
`;
    for (let i = 0; i < users.length; i++) {
        result += `
    <tr class="tr1">
        <td class="td1">${users[i].email}</td>
        <td class="td1">${users[i].username}</td>
        <td class="td1"><button id="button_${i}" class="buttonNe" onclick="banUser(${i})">Ban</button></td>
        <td class="td1"><button class="buttonNe" onclick="deleteUser(${i})">Delete</button>
        <td class="td1"><span id="trangthai_${i}">${users[i].status}</span></td>
    </tr> 
`;
    }
    document.getElementById("tableUser").innerHTML = result;
}
renderUser();
function deleteUser(id) {
    let users = JSON.parse(localStorage.getItem("users"));
    users.splice(id, 1);
    localStorage.setItem("users", JSON.stringify(users));
    renderUser();
}
function banUser(id) {
    let users = JSON.parse(localStorage.getItem("users"));
    let user = users[id];
    if (user.status === "Available") {
        user.status = "Unavailable";
        document.getElementById(`button_${id}`).innerHTML = "UnBan";
    } else {
        user.status = "Available";
        document.getElementById(`button_${id}`).innerHTML = "Ban";
    }
    document.getElementById(`trangthai_${id}`).innerHTML = user.status;
    localStorage.setItem("users", JSON.stringify(users));
}
/* Log out */
function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"
}
