// localStorage.removeItem("receive")
function showOrder() {
    // Lấy thông tin đơn hàng từ localStorage
   
    const receive = JSON.parse(localStorage.getItem("bills"));

    if (receive == null) {
        console.log("Không có đơn hàng.");
        return;
    }

    let result = `<tr class="tr1">
                   <td class="td1">ID</td>   
                    <td class="td1">ID đơn hàng</td>   
                    <td class="td1">Username</td> 
                    <td class="td1">Tên người nhận</td>     
                    <td class="td1">Số điện thoại</td> 
                    <td class="td1">Địa chỉ</td>        
                    <td class="td1">Sản phẩm mua</td>        
                    <td class="td1">Số tiền thanh toán</td>   
                    <td class="td1">Trạng thái</td>
                    
                  </tr> `;

    let count = 0;
    for (let i = 0; i < receive.length; i++) {
        const orderId = receive[i].ID;
        // Lấy danh sách sản phẩm từ localStorage hoặc đệm nếu đã được lưu trữ trước đó
        let products;
            products = JSON.parse(localStorage.getItem("bills")).filter(
                (item) => item.ID === orderId
            );
        localStorage.setItem(`products-${orderId}`, JSON.stringify(products));
        let cartz = receive[i].cart;      
        const productNames = cartz.map((item) => item.ten);
        const productImgs = cartz.map((item) => item.img);
        const productQuans = cartz.map((item)=> item.soluong)
        let stringImg = ""
        for (let i = 0; i < productNames.length; i++) {
            stringImg +=
            `
                <br>
                <img width="50px" src="${productImgs[i]}" alt="" />${productNames[i]} x ${productQuans[i]}
                <br>
            `
        }

        result += `
        <tr class="tr1">
            <td class="td1">${++count}</td>
            <td class="td1">${orderId}</td>
            <td class="td1">${receive[i].username}</td>
            <td class="td1">${receive[i].tennguoinhan}</td>
            <td class="td1">${receive[i].sdt}</td>
            <td class="td1">${receive[i].diachi}</td>
            <td class="td1 td3">
                ${stringImg}
            </td>
            <td class="td1">${receive[i].money}</td>
            <td class="td1">
                <select name="status" id="statusSelect">
                    <option value="">Chờ xác nhận</option>
                    <option value="">Đang vận chuyển</option>
                    <option value="">Hoàn thành</option>
                </select>
            </td>
            
        </tr>
    `;

    }

    document.getElementById("tableAdded").innerHTML = result;   
}
showOrder();
/* Log out */
function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "../index.html"
}
