const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(`
   <!DOCTYPE html>
<html>
<head></head>
<body>
  <ul id="itemList"></ul>
</body>
</html>
    `)
const document = dom.window.document;  
document.addEventListener('DOMContentloaded', () => {
const itemList = document.getElementById('itemList');
const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);
});

// Array to store shopping list items
let shoppingList = [];

// Function to add an item to the list
function addItem() {
    const item = itemInput.value.trim();
    if (item !== '') {
        shoppingList.push(item);
        renderList();
        itemInput.value = '';
    }
}

// Function to render the list to the DOM
function renderList() {
    itemList.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listItem.addEventListener('click', () => {
            shoppingList[index] = `<s>${item}</s>`;
            renderList();
        });
        itemList.appendChild(listItem);
    });
}

// Function to clear the list
function clearList() {
    shoppingList = [];
    renderList();
}
git 