const fieldContainer = document.querySelector('.field-container');
const outputField = document.querySelector('#record-field');
const createFieldBtn = document.querySelector('#createFieldBtn');
const saveFieldsBtn = document.querySelector('#saveFieldsBtn');
const fieldList = [];

createFieldBtn.addEventListener('click', createField);
saveFieldsBtn.addEventListener('click', saveFields);

class InputField {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'field';

        this.name = document.createElement('input');
        this.number = document.createElement('input');

        this.name.type = 'text';
        this.number.type = 'number';

        this.upButton = this.createButton('↑', this.moveUp.bind(this));
        this.downButton = this.createButton('↓', this.moveDown.bind(this));
        this.removeButton = this.createButton('x', this.remove.bind(this));

        this.container.append(this.name);
        this.container.append(this.number);
        this.container.append(this.upButton);
        this.container.append(this.downButton);
        this.container.append(this.removeButton);
    }

    createButton(text, clickHandler) {
        const button = document.createElement('button');
        button.innerText = text;
        button.addEventListener('click', clickHandler);
        return button;
    }

    moveUp() {
        let previousSibling = this.container.previousElementSibling;

        if (previousSibling) {
            previousSibling.before(this.container);
        }
    }

    moveDown() {
        let nextSibling = this.container.nextElementSibling;

        if (nextSibling) {
            nextSibling.after(this.container);
        }
    }

    remove() {
        this.container.remove();
    }
}

function createField() {
    var newField = new InputField();
    fieldContainer.appendChild(newField.container);
    fieldList.push(newField);
}

function saveFields() {
    let saveText = ['{'];

    const fieldContainers = fieldContainer.querySelectorAll('.field');

    fieldContainers.forEach((fieldContainer) => {
        let name = fieldContainer.querySelector('input[type="text"]').value;
        let number = fieldContainer.querySelector('input[type="number"]').value;

        saveText += `"${name}":"${number}",`;
    });

    if (saveText[saveText.length - 1] == ',') {
        saveText = saveText.substr(0, saveText.length - 1);
    }

    saveText += '}'
    outputField.innerHTML = saveText;
}

createField();