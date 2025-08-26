// اضافه کردن محصول به سبد خرید
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function() {
        let name = this.dataset.name;
        let price = this.dataset.price;

        let li = document.createElement("li");
        li.textContent = `${name} - ${price} تومان`;
        document.getElementById("cart-items").appendChild(li);
    });
});

// ثبت سفارش و ارسال به واتساپ
document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;

    let cartItems = document.querySelectorAll("#cart-items li");
    let products = [];
    cartItems.forEach(item => {
        products.push(item.innerText);
    });

    if (products.length === 0) {
        alert("لطفاً یک محصول انتخاب کنید.");
        return;
    }

    let message = `سلام، من ${name} هستم.\nشماره تماس: ${phone}\n\nسفارش من:\n${products.join("\n")}`;
    let encodedMessage = encodeURIComponent(message);

    let whatsappNumber = "989195850084"; // شماره خودت (مثلاً 98912...)

    let isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let url = isMobile 
        ? `https://wa.me/${whatsappNumber}?text=${encodedMessage}` 
        : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    window.open(url, "_blank");
});
