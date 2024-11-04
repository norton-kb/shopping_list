const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const clearListBtn = document.getElementById('clearListBtn');
const shoppingList = document.getElementById('shoppingList');

let items = JSON.parse(localStorage.getItem('shoppingList')) || [];

// Function to render items in the list
function renderList() {
    shoppingList.innerHTML = '';
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.text;
        li.className = item.purchased ? 'purchased' : '';
        li.addEventListener('click', () => togglePurchased(index));
        li.addEventListener('dblclick', () => editItem(index));
        shoppingList.appendChild(li);
    });
}

// Function to add a new item
function addItem() {
    const text = itemInput.value.trim();
    if (text) {
        items.push({ text, purchased: false });
        itemInput.value = '';
        saveList();
        renderList();
    }
}

// Function to toggle purchased status
function togglePurchased(index) {
    items[index].purchased = !items[index].purchased;
    saveList();
    renderList();
}

// Function to edit an existing item
function editItem(index) {
    const newText = prompt('Edit item:', items[index].text);
    if (newText !== null) {
        items[index].text = newText;
        saveList();
        renderList();
    }
}

// Function to clear the list
function clearList() {
    items = [];
    saveList();
    renderList();
}

// Function to save the list to local storage
function saveList() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Event listeners
addItemBtn.addEventListener('click', addItem);
clearListBtn.addEventListener('click', clearList);
renderList();  // Initial rendering of the list
