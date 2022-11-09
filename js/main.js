const doc = document;
const addTodoInput = doc.querySelector('.addTodo__input input');
const addTodoBtn = doc.querySelector('.addTodo__btn');
const box = doc.querySelector('.box');

const todos = [
    {title: 'Сходить в магазин', done: false},
    {title: 'Сделать ДЗ', done: false},
];

render(todos, box);

addTodoBtn.onclick = function() {
    const newTodoText = addTodoInput.value;
    const newTodo = {title: newTodoText,done: false,}

    todos.push(newTodo);

    render(todos, box);

    addTodoInput.value = '';
}


function render(data, parent) {
    let boxItem, delBtn;
    const itemsHtml = data.map(function(item, index) {
        return `
            <div data-index = ${index} class="box-item">
                <input type="checkbox" ${item.done ? 'checked': ''}/>
                <span>${index + 1}</span>
                <p ${item.done ? 'style="text-decoration: line-through"' : '' }>${item.title}</p>
                <span data-index="${index}" class="del">x</span>
            </div>
        `
    }).join('');
    parent.innerHTML = itemsHtml;

    boxItem = parent.querySelectorAll('.box-item');
    boxItem.forEach(function(item) {
        item.onclick = function() {
            const elIndex = this.dataset.index;
            data[elIndex].done = !data[elIndex].done;
            render(todos, parent);
        }
    });

    delBtn = parent.querySelectorAll('.del');
    delBtn.forEach(function(item) {
        item.onclick = function(e) {
            e.stopPropagation();
            const elIndex = this.dataset.index;
            todos.splice(elIndex, 1);
            render(todos, parent);
        }
    });
}