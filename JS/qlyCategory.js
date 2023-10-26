// function findingID() {
//     let listProduct = JSON.parse(localStorage.getItem("listProduct"));
//     // let findID = listProduct.filter((fid) => fid.ID === )
//     console.log(listProduct[0].ID, "111");
//     if (listProduct) {
//         for (let i = 0; i < listProduct.length; i++) {
//             let findID = listProduct[i].ID
//         }
//     }
// }
// findingID();
// let category = [
//     {
//         id:1,
//         name:"Sách khoa học"
//     },
//     {
//         id:2,
//         name:"Truyện Việt Nam"
//     },
//     {
//         id:3,
//         name:"Sách Self-help"
//     }
// ];
// localStorage.setItem("category", JSON.stringify(category));




function renderCategory() {
    const categorys = JSON.parse(localStorage.getItem("category")) || [];
    let stringHTML = "";
    for (let i = 0; i < categorys.length; i++) {
        stringHTML +=
            `
            <tr>
                <td>${categorys[i].id}</td>
                <td>${categorys[i].name}</td>
                <td>
                    <button onclick="clickUpdateCategory(${categorys[i].id})">Sửa</button>
                    <button onclick="deleteCategory(${categorys[i].id})">Xóa</button>
                </td>
            </tr>
        `
    }
    document.getElementById("table_body").innerHTML = stringHTML
}
renderCategory()

/*  */
function addCategory() {
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    const category = document.getElementById("input_category").value
    
    if (category) {
        categorys.push({
            id: categorys[categorys.length - 1].id + 1,
            name: category
        })
        localStorage.setItem("category", JSON.stringify(categorys))
        document.getElementById("input_category").value = ""
        renderCategory()
    }
}
function deleteCategory(id) {
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    categorys = categorys.filter(item => item.id != id)
    localStorage.setItem("category", JSON.stringify(categorys))
    renderCategory()
}

let idUpdate
function clickUpdateCategory(id) {
    idUpdate = id
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    const category = categorys.find(item => item.id == id)
    document.getElementById("input_category").value = category.name
}

function updateCategory() {
    let categorys = JSON.parse(localStorage.getItem("category")) || [];
    const newCategory = document.getElementById("input_category").value
    const index = categorys.findIndex(item => item.id == idUpdate)
    if (index > - 1) {
        categorys[index] = {
            id: idUpdate,
            name: newCategory
        }
        localStorage.setItem("category", JSON.stringify(categorys))
        document.getElementById("input_category").value = ""
        renderCategory()
    } else {
        alert("Không tìm thấy!")
    }
}
/* Log out */
function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"
}