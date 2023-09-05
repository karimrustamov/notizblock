let names = [];
let phoneNumbers = [];
load();

function addContact() {
    let name = document.getElementById('name');
    let phone = document.getElementById('phone');

    names.push(name.value);
    phoneNumbers.push(phone.value);
    render();
    save();
}

function deleteContact(i){
    names.splice(i, 1);
    phoneNumbers.splice(i, 1);
    render();
    save();
}

function save() {
    let namesAsText = JSON.stringify(names);
    let phonenumbersAsText = JSON.stringify(phoneNumbers);
    localStorage.setItem('names',namesAsText);
    localStorage.setItem('phoneNumbers',phonenumbersAsText);
}

function load () {
    let namesAsText = localStorage.getItem('names');
    let phonenumbersAsText = localStorage.getItem('phoneNumbers')
        if (namesAsText && phonenumbersAsText) {
        names = JSON.parse(namesAsText);
        phoneNumbers = JSON.parse (phonenumbersAsText);
        }
}

function render() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += `<h1>My Notes</h1>`;
    content.innerHTML += /*html*/`
     <div class="inputFields">
            <input placeholder="Topic" id="name">
            <textarea name="Notiz" id="phone" cols="30" rows="10"></textarea>
            <button onclick="addContact()">Hinzufügen</button>
            
        </div>
    `;

    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const phoneNumber = phoneNumbers[i];

        content.innerHTML +=/*html*/ `
        <div class="card">
            <b>Topic: </b> ${name}<br>
            <b>Notiz: </b> ${phoneNumber}<br>
            <button onclick="deleteContact(${i})">Löschen</Button>
        </div>
        `;
    }
}

