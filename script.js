let topics = [];
let notes = [];
let deletedTopics = [];
let deletedNotes = [];


load();

function addNote() {
    let topic = document.getElementById('topic');
    let note = document.getElementById('notes');

    if (topic.value.trim() === "" || note.value.trim() === "") {
        alert("Bitte füllen Sie beide Felder aus!");
        return;
    }

    topics.push(topic.value);
    notes.push(note.value);
    render();
    save();
}


function deleteNote(i) {
    deletedTopics.push(topics[i]);
    deletedNotes.push(notes[i]);

    topics.splice(i, 1);
    notes.splice(i, 1);
    render();
    save();
    renderSidebar(); // Hier haben wir die Sidebar aktualisiert, um die neue Anzahl der gelöschten Notizen anzuzeigen
}

function save() {
    let topicsAsText = JSON.stringify(topics);
    let notesAsText = JSON.stringify(notes);
    let deletedTopicsAsText = JSON.stringify(deletedTopics);
    let deletedNotesAsText = JSON.stringify(deletedNotes);

    localStorage.setItem('topics', topicsAsText);
    localStorage.setItem('notes', notesAsText);
    localStorage.setItem('deletedTopics', deletedTopicsAsText);
    localStorage.setItem('deletedNotes', deletedNotesAsText);
}

function load() {
    let topicsAsText = localStorage.getItem('topics');
    let notesAsText = localStorage.getItem('notes');
    let deletedTopicsAsText = localStorage.getItem('deletedTopics');
    let deletedNotesAsText = localStorage.getItem('deletedNotes');

    if (topicsAsText && notesAsText) {
        topics = JSON.parse(topicsAsText);
        notes = JSON.parse(notesAsText);
    }

    if (deletedTopicsAsText && deletedNotesAsText) {
        deletedTopics = JSON.parse(deletedTopicsAsText);
        deletedNotes = JSON.parse(deletedNotesAsText);
    }
}

function render() {
    let content = document.getElementById('content');

    // Hier leeren wir zuerst den deletedContent, um sicherzustellen, dass nur die ungelöschten Notizen angezeigt werden.
    let deletedContent = document.getElementById('deletedContent');
    deletedContent.innerHTML = '';

    let htmlContent = '<div id="allInput">';
    htmlContent += '<h1>My Notes</h1>';
    htmlContent += /*html*/`
     <div class="inputFields">
            <input placeholder="Topic" id="topic">
            <textarea placeholder="Notes..." name="Notiz" id="notes" cols="30" rows="10"></textarea>
            <button class="button" onclick="addNote()">Hinzufügen</button>
        </div>
    `;

    for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        const note = notes[i];

        htmlContent += /*html*/ `
        <div class="card">
            <b>${topic}<br></b> 
            <b>Notiz: </b>${note}<br>
            <button onclick="editNote(${i})">Bearbeiten</Button>
            <button onclick="deleteNote(${i})">Löschen</Button>
        </div>
        `;
    }

    content.innerHTML = htmlContent;
}

function editNote(i) {
    let content = document.getElementById('content');
    
    let htmlContent = '<div id="allInput">';
    htmlContent += '<h1>My Notes</h1>';
    htmlContent += /*html*/ `
        <div class="inputFields">
            <input placeholder="Topic" id="topic" value="${topics[i]}">
            <textarea placeholder="Notes..." name="Notiz" id="notes" cols="30" rows="10">${notes[i]}</textarea>
            <button class="button" onclick="saveEdit(${i})">Speichern</button>
            <button class="button" onclick="cancelEdit()">Abbrechen</button>
        </div>
    `;

    content.innerHTML = htmlContent;
}

function finalDelete(i) {
    deletedTopics.splice(i, 1);
    deletedNotes.splice(i, 1);
    save();
    showDeletedNotes();
    renderSidebar(); // Hier haben wir die Sidebar aktualisiert, um die neue Anzahl der gelöschten Notizen anzuzeigen
}

function backToList(i) {
    topics.push(deletedTopics[i]);
    notes.push(deletedNotes[i]);

    deletedTopics.splice(i, 1);
    deletedNotes.splice(i, 1);

    save();
    render();
    showDeletedNotes();
    renderSidebar(); // Hier haben wir die Sidebar aktualisiert, um die neue Anzahl der gelöschten Notizen anzuzeigen
}



function showDeletedNotes() {
    let content = document.getElementById('content');
    content.innerHTML = ''; // Leeren des Inhaltsbereichs, sodass nur gelöschte Notizen angezeigt werden.

    let deletedContent = document.getElementById('deletedContent');
    let htmlContent = '<div class="deletedCard">';

    htmlContent += '<h1>My deleted Notes</h1>';



    for (let i = 0; i < deletedTopics.length; i++) {
        const topic = deletedTopics[i];
        const note = deletedNotes[i];

        htmlContent += /*html*/ `
        <div>
            <b>${topic}<br></b> 
            <b>Notiz: </b>${note}<br>
            <button class="restoreButton" onclick="backToList(${i})">Wiederherstellen</Button>
        <button class="deleteButton" onclick="finalDelete(${i})">Löschen</Button>
        </div>
        `;
    }

    htmlContent += '</div>';

    deletedContent.innerHTML = htmlContent;
}

function renderSidebar() {
    let sidebarContent = document.getElementById('sidebar');

    let htmlContent = `<div id="sidebarContent">`;
    htmlContent += `<button onclick="render()">Alle Notizen</button>`;
    htmlContent += `<button onclick="showDeletedNotes()">Gelöschte Notizen <span class="badge">${deletedTopics.length}</span></button>`;
    htmlContent += `</div>`;

    sidebarContent.innerHTML = htmlContent;
}

function saveEdit(i) {
    let topic = document.getElementById('topic');
    let note = document.getElementById('notes');
    
    topics[i] = topic.value;
    notes[i] = note.value;
    
    save();
    render();
}

function cancelEdit() {
    render();
}

function initializeApp() {
    load();
    renderSidebar();
    render();
}

window.onload = initializeApp;
