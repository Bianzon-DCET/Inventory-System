// display in inventory
// search product
// add product 
// edit product
// delete product
// sort product
// upload image
// open add modal
// open edit modal
// update table
// sucess/error message

var inventory = [];


function addItem(event) {
  event.preventDefault(); 

 
  var name = document.getElementById("itemName").value;
  var details = document.getElementById("itemDetails").value;
  var quantity = parseInt(document.getElementById("itemQuantity").value);
  var price = parseFloat(document.getElementById("itemPrice").value);
  var date = document.getElementById("itemDate").value;
  var type = document.getElementById("itemType").value;
  var image = document.getElementById("itemImage").value;

  

  inventory.push({
    name: name,
    details: details,
    quantity: quantity,
    price: price,
    date: date,
    type: type,
    image: image
  });

  
  document.getElementById("itemForm").reset();


  document.getElementById("itemModal").classList.add("hidden");


  displayInventory();
}

document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#inventoryTable tbody tr');

  rows.forEach(row => {
    const name = row.children[0].textContent.toLowerCase();
    const details = row.children[1].textContent.toLowerCase();
    const type = row.children[5].textContent.toLowerCase();

    if (name.includes(query) || details.includes(query) || type.includes(query)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
