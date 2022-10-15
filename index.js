
const form = document.getElementById('form');

const text = document.getElementById('text');

const list = document.getElementById('list');




form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(text.value.trim()){
        addItemToList(createListItem(text.value, list.childElementCount + 1));
        text.value = '';
    } else {
        alert('Cannot be empty')
    }
    

})

function createListItem(text, index) {
    return `
    <li data-listItemId = ${index}>
        <div class='content'>
            <span>${index}</span> 
            <span>${text}</span>  
        </div>
        <div class="actions">
            <span data-action ='complete'>Complete</span>
            <span data-action = 'delete'>Delete</span>
        </div>
    </li>
    `
}

function addItemToList(item) {
    list.innerHTML = list.innerHTML + item;
}

function changeItemsNextItemsContent(item) {
    let listChildrenArray = [...list.children]
    let indexOfRemoved = listChildrenArray.indexOf(item);
    return listChildrenArray.map((item, idx) => {
        if(indexOfRemoved < idx) {
            item.firstElementChild.firstElementChild.textContent -= 1
        }
    })

}

function removeItem(item) {
    item.remove();
}

list.addEventListener('click', (e) => {
    const listItem = e.path.find(el => el.tagName === 'LI');
    if(e.target.dataset.action === 'complete') {
        listItem.classList.toggle('completed');
    } else if(e.target.dataset.action === 'delete') {
        listItem.classList.add('deleted');
        if (listItem.nextElementSibling) setTimeout(changeItemsNextItemsContent, 600, listItem);
        setTimeout(removeItem, 600, listItem);
    }
    
})


