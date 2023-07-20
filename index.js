document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll("button[data-product-sku]");


  const cartItems = [];


  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const productSku = button.getAttribute("data-product-sku");
      const productName = button.parentElement.querySelector(".name").innerText;
      const productPrice = parseFloat(button.parentElement.querySelector("#price").innerText);
      const newItem = { sku: productSku, name: productName, price: productPrice };


      const itemIndex = cartItems.findIndex((item) => item.sku === productSku);

      if (itemIndex === -1) {
        cartItems.push(newItem);
      } else {

        cartItems[itemIndex] = newItem;
      }


      displayCartItems();
    });
  });

  function displayCartItems() {
    const resultElement = document.querySelector(".result");
    resultElement.innerHTML = "";

    if (cartItems.length === 0) {
      resultElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    const cartList = document.createElement("ul");
    cartItems.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        <strong>${item.name}</strong> - $${item.price.toFixed(2)}
        <button class="remove-button">Remove</button>`;
      cartList.appendChild(cartItem);
    });

    resultElement.appendChild(cartList);

    const removeButtons = document.querySelectorAll(".remove-button");
    removeButtons.forEach((removeButton) => {
      removeButton.addEventListener("click", function () {
        const itemIndex = this.getAttribute("data-item-index");
        cartItems.splice(itemIndex, 1);
        displayCartItems();
      });
    });
  }
});