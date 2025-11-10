function openModal(){
    const opm=document.getElementById("Checkout")
    opm.style.display="flex";
    const content = opm.querySelector(".modal-content");
    if(content) content.scrollTop = 0;
}
function closeModal(){
    document.getElementById("Checkout").style.display="none";
}
// --- Hàm điền tự động khi chọn địa chỉ từ tài khoản ---
function fillAddress() {
    const select = document.getElementById('savedAddress');
    const selected = select.options[select.selectedIndex];

    if (selected.value === "") {
        // Nhập địa chỉ mới → reset
        document.getElementById('name').value = "";
        document.getElementById('phone').value = "";
        document.getElementById('adr').value = "";
        document.getElementById('province').value = "";
        document.getElementById('district').innerHTML = '<option value="">-- Chọn quận/huyện --</option>';
    } else {
        document.getElementById('name').value = selected.getAttribute('data-name');
        document.getElementById('phone').value = selected.getAttribute('data-phone');
        document.getElementById('adr').value = selected.getAttribute('data-adr');
        document.getElementById('province').value = selected.getAttribute('data-province');
        // Cập nhật districts và chọn quận tương ứng
        updateDistricts();
        document.getElementById('district').value = selected.getAttribute('data-district');
    }
}
const provinceNames = {
    hanoi: "Hà Nội",
    hcm: "TP. Hồ Chí Minh"
};

const districtNames ={
  bađình:"Ba Đình",
  hoànkiếm:"Hoàn Kiếm",
  đốngđa:"Đống Đa",
  cầugiấy:"Cầu Giấy",
  quận1:"Quận 1",
  quận3:"Quận 3",
  quận7:"Quận 7",
}
const districts = {
  hanoi: ["Ba Đình", "Hoàn Kiếm", "Đống Đa", "Cầu Giấy"],
  hcm: ["Quận 1", "Quận 3", "Quận 7"]
};

function updateDistricts() {
  const provinceSelect = document.getElementById("province");
  const districtSelect = document.getElementById("district");
  const selectedProvince = provinceSelect.value;

  // Xóa các quận/huyện cũ
  districtSelect.innerHTML = '<option value="">-- Chọn quận/huyện --</option>';

  // Nếu có tỉnh được chọn, thêm quận/huyện tương ứng
  if (districts[selectedProvince]) {
    districts[selectedProvince].forEach(function(district) {
      const option = document.createElement("option");
      option.value = district.toLowerCase().replace(/\s/g, "");
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  }
}

function handleClick(event) {
  if (event) event.preventDefault(); // ngăn submit mặc định
  const Name=document.getElementById("name").value.trim();
  const PhoneNumber=document.getElementById("phone").value.trim();
  const Adress=document.getElementById("adr").value.trim();
  const Province=document.getElementById("province").value.trim();
  const District=document.getElementById("district").value.trim();
  const Paymen = document.querySelector('input[name="pay"]:checked');
  if(Name&&PhoneNumber&&Adress&&Province&&District&&Paymen){
    addNewAddressIfNotExist();
    alert("Đặt hàng thành công!");
    closeModal();
    document.getElementById("Checkout").reset();
  }else{
    alert("Vui lòng điền đủ thông tin!");
  }
}
function addNewAddressIfNotExist() {
    const select = document.getElementById('savedAddress');
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const adr = document.getElementById('adr').value.trim();
    const province = document.getElementById('province').value.trim();
    const district = document.getElementById('district').value.trim();

    if(!name || !phone || !adr || !province || !district) return;

    // Kiểm tra xem địa chỉ đã tồn tại chưa
    const exists = Array.from(select.options).some(opt => 
        opt.getAttribute('data-name') === name &&
        opt.getAttribute('data-phone') === phone &&
        opt.getAttribute('data-adr') === adr &&
        opt.getAttribute('data-province') === province &&
        opt.getAttribute('data-district') === district
    );

    if(exists) return; // nếu đã có, không thêm

    // Tạo option mới
    const newValue = `addr${select.options.length}`;
    const option = document.createElement('option');
    option.value = newValue;
    option.textContent = `${name} - ${adr}, ${districtNames[district]}, ${provinceNames[province]}`;
    option.setAttribute('data-name', name);
    option.setAttribute('data-phone', phone);
    option.setAttribute('data-adr', adr);
    option.setAttribute('data-province', province);
    option.setAttribute('data-district', district);
    select.appendChild(option);
    select.value = newValue; // chọn địa chỉ vừa thêm
}
// BẮT SỰ KIỆN NHẤN ESC
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        const modal = document.getElementById("Checkout");
        if (modal.style.display === "flex") {
            modal.style.display = "none";
            modal.scrollTop = 0;
            modal.reset();
        }
    }
});