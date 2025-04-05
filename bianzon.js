// Function to display inventory
function displayInventory() {
  const tbody = document.querySelector("#inventoryTable tbody");
  tbody.innerHTML = ""; // Clear current table content

  inventory.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.details}</td>
        <td>${item.quantity}</td>
        <td>${item.price}</td>
        <td>${item.date}</td>
        <td>${item.type}</td>
        <td><img src="${item.image}" alt="Image"></td>
        <td>
          <button class="editBtn" data-index="${index}">Edit</button>
          <button class="deleteBtn" data-index="${index}">Delete</button>
        </td>
      `;
    tbody.appendChild(row);
  });

  // Attach event listeners to buttons
  document.querySelectorAll(".editBtn").forEach((button) => {
    button.addEventListener("click", editItem);
  });

  document.querySelectorAll(".deleteBtn").forEach((button) => {
    button.addEventListener("click", deleteItem);
  });
}

// Function to add a new item (called when the form is submitted)
function addItem(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get values from the form
  const name = document.getElementById("itemName").value;
  const details = document.getElementById("itemDetails").value;
  const quantity = parseInt(document.getElementById("itemQuantity").value);
  const price = parseFloat(document.getElementById("itemPrice").value);
  const date = document.getElementById("itemDate").value;
  const type = document.getElementById("itemType").value;
  const image =
    document.getElementById("itemImage").value ||
    "https://via.placeholder.com/50"; // Default image if none provided

  // Add the new item to the inventory
  inventory.push({ name, details, quantity, price, date, type, image });

  // Reset the form
  document.getElementById("itemForm").reset();

  // Close the modal
  document.getElementById("itemModal").classList.add("hidden");

  // Re-display the updated inventory
  displayInventory();
}

// Function to edit an item
function editItem(event) {
  const index = event.target.getAttribute("data-index");
  const item = inventory[index];

  // Fill the form with current item data
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemDetails").value = item.details;
  document.getElementById("itemQuantity").value = item.quantity;
  document.getElementById("itemPrice").value = item.price;
  document.getElementById("itemDate").value = item.date;
  document.getElementById("itemType").value = item.type;
  document.getElementById("itemImage").value = item.image;

  // Show the modal and change its title
  document.getElementById("modalTitle").innerText = "Edit Item";

  // Handle submit button as update
  const form = document.getElementById("itemForm");
  form.onsubmit = function (event) {
    event.preventDefault();

    // Update the item data
    item.name = document.getElementById("itemName").value;
    item.details = document.getElementById("itemDetails").value;
    item.quantity = parseInt(document.getElementById("itemQuantity").value);
    item.price = parseFloat(document.getElementById("itemPrice").value);
    item.date = document.getElementById("itemDate").value;
    item.type = document.getElementById("itemType").value;
    item.image =
      document.getElementById("itemImage").value ||
      "https://via.placeholder.com/50"; // Default image if none provided

    // Close the modal
    document.getElementById("itemModal").classList.add("hidden");

    // Re-display the updated inventory
    displayInventory();
  };

  // Show the modal
  document.getElementById("itemModal").classList.remove("hidden");
}

// Function to delete an item
function deleteItem(event) {
  const index = event.target.getAttribute("data-index");

  // Remove item from the inventory
  inventory.splice(index, 1);

  // Re-display the updated inventory
  displayInventory();
}

// Function to handle sorting by different fields
function sortInventory(field, order) {
  inventory.sort((a, b) => {
    if (order === "asc") {
      return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0;
    } else {
      return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0;
    }
  });
  displayInventory();
}

// Event listeners for sorting
document.getElementById("sortNameBtn").addEventListener("click", () => {
  const order =
    document.getElementById("nameArrow").innerText === "↓" ? "asc" : "desc";
  sortInventory("name", order);
  document.getElementById("nameArrow").innerText = order === "asc" ? "↓" : "↑";
});

document.getElementById("sortPriceBtn").addEventListener("click", () => {
  const order =
    document.getElementById("priceArrow").innerText === "↓" ? "asc" : "desc";
  sortInventory("price", order);
  document.getElementById("priceArrow").innerText = order === "asc" ? "↓" : "↑";
});

document.getElementById("sortQuantityBtn").addEventListener("click", () => {
  const order =
    document.getElementById("quantityArrow").innerText === "↓" ? "asc" : "desc";
  sortInventory("quantity", order);
  document.getElementById("quantityArrow").innerText =
    order === "asc" ? "↓" : "↑";
});

document.getElementById("sortDateBtn").addEventListener("click", () => {
  const order =
    document.getElementById("dateArrow").innerText === "↓" ? "asc" : "desc";
  sortInventory("date", order);
  document.getElementById("dateArrow").innerText = order === "asc" ? "↓" : "↑";
});

document.getElementById("sortTypeBtn").addEventListener("click", () => {
  const order =
    document.getElementById("typeArrow").innerText === "↓" ? "asc" : "desc";
  sortInventory("type", order);
  document.getElementById("typeArrow").innerText = order === "asc" ? "↓" : "↑";
});

// Event listener for the Add Item button
document.getElementById("addBtn").addEventListener("click", () => {
  document.getElementById("itemModal").classList.remove("hidden");
  document.getElementById("modalTitle").innerText = "Add Item";

  // Reset form
  document.getElementById("itemForm").reset();

  // Handle submit button as add
  const form = document.getElementById("itemForm");
  form.onsubmit = addItem;
});

// Event listener for cancel button
document.getElementById("cancelBtn").addEventListener("click", () => {
  document.getElementById("itemModal").classList.add("hidden");
});

// Initially display inventory
displayInventory();
