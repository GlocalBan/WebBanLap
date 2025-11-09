// Giả sử cart đã tồn tại
let cart = window.cart || [
    {id:'p1', name:'Sản phẩm A', price:100000, quantity:2},
    {id:'p2', name:'Sản phẩm B', price:200000, quantity:1}
];

// Render giỏ hàng trên order page
function renderCart() {
    const tbody = document.querySelector("#cart-table tbody");
    tbody.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price.toLocaleString()}đ</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)">
            </td>
            <td>${(item.price * item.quantity).toLocaleString()}đ</td>
            <td><button onclick="removeFromCart('${item.id}')">Xóa</button></td>
        `;
        tbody.appendChild(tr);

        total += item.price * item.quantity;
        totalItems += item.quantity;
    });

    // Cập nhật tổng tiền và tổng sản phẩm
    document.getElementById("cart-total").innerText = `Tổng cộng: ${total.toLocaleString()}đ`;
    document.getElementById("cart-items").innerText = `Tổng số sản phẩm: ${totalItems}`;
}


function updateQuantity(id, qty) {
    let item = cart.find(i => i.id === id); // Tìm sản phẩm có id trùng
    if (item) {
        item.quantity = parseInt(qty);      // Chuyển giá trị nhập sang số nguyên
        if (item.quantity <= 0) removeFromCart(id); // Nếu <=0 thì xóa khỏi giỏ
        renderCart();                        // Cập nhật lại giao diện giỏ hàng
    }
}

function removeFromCart(id){
    cart = cart.filter(i=>i.id!==id);
    renderCart();
}

// Render summary trong modal
function renderOrderSummary(){
    const summary = document.getElementById("order-summary");
    if(cart.length===0){
        summary.innerHTML = "<p>Giỏ hàng trống</p>";
        return;
    }
    summary.innerHTML = "<ul>" + cart.map(i=>`<li>${i.name} x${i.quantity} = ${(i.price*i.quantity).toLocaleString()}đ</li>`).join('') + "</ul>";
}



renderCart();
