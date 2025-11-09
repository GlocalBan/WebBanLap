// --- Phần MỚI THÊM VÀO ---

// Danh sách sản phẩm
const products = [
    { id: 'lap1', name: 'Laptop Dell Inspiron', price: 15000000 },
    { id: 'lap2', name: 'Laptop Asus VivoBook', price: 13500000 },
    { id: 'phu1', name: 'Chuột Logitech', price: 450000 },
    { id: 'phu2', name: 'Bàn phím cơ Keychron', price: 1900000 },
    { id: 'phu3', name: 'Tai nghe Sony WH-1000XM4', price: 5990000 }
];
// Hiển thị danh sách sản phẩm ra giao diện
function renderProducts() {
    const list = document.getElementById("product-list");
    list.innerHTML = "";
    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-item";
        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString()}đ</p>
            <button onclick="addToCart('${p.id}')">Thêm vào giỏ</button>
        `;
        list.appendChild(div);
    });
}

// Thêm sản phẩm vào giỏ hàng có sẵn
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart(); // gọi lại hàm có sẵn
}
renderProducts();

// Khởi tạo khi load trang
window.addEventListener("DOMContentLoaded", renderProducts);
