function addToCart(itemName, itemPrice, itemImage, inputId) {
  const quantityInput = document.getElementById(inputId);
  const itemQuantity = parseInt(quantityInput.value);
  console.log(itemQuantity);

  if (itemQuantity <= 0) {
    return;
  }

  let cartItems = localStorage.getItem("cartItems");
  console.log(cartItems);
  cartItems = cartItems ? JSON.parse(cartItems) : [];
  const existingItem = cartItems.find((item) => item.name === itemName);
  console.log(existingItem);

  if (existingItem) {
    existingItem.quantity += itemQuantity;
    console.log(existingItem.quantity);
  } else {
    cartItems.push = ({
      name: itemName,
      price: itemPrice,
      image: itemImage,
      quantity: itemQuantity,
    });

    console.log(`cartItems according to pushed array: ${cartItems}`);
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  console.log(`cart Items in ls: ${localStorage.getItem("cartItems")}`);

  showNotification(
    `${itemQuantity} ${itemName}${itemQuantity > 1 ? "s" : ""} Added to Cart!`,
  );

  setTimeout(() => {
    hideNotification();
  }, 2000);
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.opacity = "1";
}

function hideNotification() {
  const notification = document.getElementById("notification");
  notification.style.opacity = "0";
}

function removeFromCart(index) {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItems);
  }

  cartItems.splice(index, 1);

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCartItems();
}

function renderCartItems() {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItems);
  }

  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  let totalPrice = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const { name, price, image } = cartItems[i];
    console.log(cartItems[i]);
    totalPrice += price;

    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    const itemImageElement = document.createElement("img");
    itemImageElement.src = image;
    itemImageElement.alt = name;

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("item-details");

    const itemName = document.createElement("h3");
    itemName.textContent = name;

    const itemPrice = document.createElement("p");
    itemPrice.textContent = `$${price.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = () => removeFromCart(i);

    itemDetails.appendChild(itemName);
    itemDetails.appendChild(itemPrice);

    itemElement.appendChild(itemImageElement);
    itemElement.appendChild(itemDetails);
    itemElement.appendChild(removeButton);

    cartContainer.appendChild(itemElement);
  }

  if (cartItems.length === 0) {
    const emptyCartMessage = document.createElement("p");
    emptyCartMessage.textContent = "Your cart is empty.";
    emptyCartMessage.id = "emptyCartMessage";
    cartContainer.appendChild(emptyCartMessage);
  }

  // JANUARY 6th IS BEAN DAY - THIS CODE GIVES DISCOUNT THEN!

  const today = new Date();
  const january6 = new Date(today.getFullYear(), 0, 6);
  if (
    today.getMonth() === january6.getMonth() &&
    today.getDate() === january6.getDate()
  ) {
    const discountedPrice = totalPrice / 2;
    document.getElementById("totalPrice").textContent =
      `NATIONAL BEAN DAY 30% DISCOUNT: Total Price: $${discountedPrice.toFixed(2)}`;
  } else {
    document.getElementById("totalPrice").textContent =
      `Total Price: $${totalPrice.toFixed(2)}`;
  }
}

window.onload = renderCartItems;
function checkout() {
  let cartItems = localStorage.getItem("cartItems");
  if (!cartItems) {
    cartItems = [];
  } else {
    cartItems = JSON.parse(cartItems);
  }

  localStorage.removeItem("cartItems");
  renderCartItems();
  // Change text to "Thank you for your purchase!" and remove everything else"
  beanCartHeading = document.getElementById("beanCartHeading");
  beanCartButton = document.getElementById("beanCartButton");
  totalPrice = document.getElementById("totalPrice");
  const randomDay = Math.floor(Math.random() * 364) + 1;
  console.log(randomDay);
  const deliveryDate = new Date(
    Date.now() + randomDay * 24 * 60 * 60 * 1000,
  ).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(deliveryDate);
  emptyCartMessage.textContent = `Thank you for your purchase! Your new beans will be delivered ${deliveryDate}*`;

  emptyCartMessage.style.fontSize = "2rem";
  emptyCartMessage.style.fontWeight = "bold";
  emptyCartMessage.style.textAlign = "center";
  emptyCartMessage.style.width = "100%";
  emptyCartMessage.style.marginLeft = "20%";
  emptyCartMessage.style.marginRight = "20%";
  beanCartHeading.style.display = "none";
  beanCartButton.style.display = "none";
  totalPrice.style.display = "none";
}
