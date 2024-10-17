class CartItem {
  constructor(element) {
    this.element = element;
    this.quantityElement = this.element.querySelector(".quantity");
    this.priceElement = this.element.querySelector(".price");

    this.increaseButton = this.element.querySelector(".increase-qty");
    this.decreaseButton = this.element.querySelector(".decrease-qty");
    this.removeButton = this.element.querySelector(".remove-item");
    this.heartButton = this.element.querySelector(".heart-btn");

    this.bindEvents();
  }

  bindEvents() {
    this.increaseButton.addEventListener("click", () =>
      this.increaseQuantity()
    );
    this.decreaseButton.addEventListener("click", () =>
      this.decreaseQuantity()
    );
    this.removeButton.addEventListener("click", () => this.removeItem());
    this.heartButton.addEventListener("click", () => this.toggleLike());
  }

  increaseQuantity() {
    let quantity = parseInt(this.quantityElement.textContent);
    quantity++;
    this.quantityElement.textContent = quantity;
    updateTotal(); // Update total after modification
  }

  decreaseQuantity() {
    let quantity = parseInt(this.quantityElement.textContent);
    if (quantity > 1) {
      quantity--;
      this.quantityElement.textContent = quantity;
      updateTotal(); // Update total after modification
    }
  }

  removeItem() {
    this.element.remove();
    updateTotal(); // Update total after removal
  }

  toggleLike() {
    this.heartButton.classList.toggle("liked");
  }

  getPrice() {
    return parseFloat(this.priceElement.textContent);
  }

  getQuantity() {
    return parseInt(this.quantityElement.textContent);
  }
}

class Cart {
  constructor() {
    this.cartItems = [];
    this.init();
  }

  init() {
    const itemElements = document.querySelectorAll(".cart-item");
    itemElements.forEach((itemElement) => {
      this.cartItems.push(new CartItem(itemElement));
    });
    this.updateTotal(); // Initial total calculation
  }

  updateTotal() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.getPrice() * cartItem.getQuantity();
    });
    document.querySelector("#total").textContent = total.toFixed(2);
  }
}

// Initialize the cart
const cart = new Cart();
