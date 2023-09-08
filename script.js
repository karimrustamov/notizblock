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
    showDeletedNotes();
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

    let htmlContent = '<div id="allInput">';
    htmlContent += '<h1>My Notes</h1>';
    htmlContent += /*html*/`
     <div class="inputFields">
            <input placeholder="Topic" id="topic">
            <textarea placeholder="Notes..." name="Notiz" id="notes" cols="30" rows="10"></textarea>
            <button class="button" onclick="addNote()">Hinzufügen</button>
        </div>
    `;
    htmlContent += '<button onclick="showDeletedNotes()" id="showDeleted">Zeige gelöschte Notizen</button>'
    htmlContent += '</div>';

    for (let i = 0; i < topics.length; i++) {
        const topic = topics[i];
        const note = notes[i];

        htmlContent += /*html*/ `
        <div class="card">
            <b>${topic}<br></b> 
            <b>Notiz: </b>${note}<br>
            <button onclick="deleteNote(${i})">Löschen</Button>
        </div>
        `;
    }

    content.innerHTML = htmlContent;
}

function finalDelete(i) {
    deletedTopics.splice(i, 1);
    deletedNotes.splice(i, 1);
    save();
    showDeletedNotes();
}

function backToList(i) {
    // Die Notiz zurück zur Liste der aktiven Notizen hinzufügen
    topics.push(deletedTopics[i]);
    notes.push(deletedNotes[i]);

    // Die Notiz von der Liste der gelöschten Notizen entfernen
    deletedTopics.splice(i, 1);
    deletedNotes.splice(i, 1);

    save(); // um die Änderungen zu speichern
    render(); // um die aktualisierte Liste der aktiven Notizen anzuzeigen
    showDeletedNotes(); // um die aktualisierte Liste der gelöschten Notizen anzuzeigen
}

function hideDeletedNotes() {
    let content = document.getElementById('deletedContent');
    content.innerHTML = '';
}


function showDeletedNotes() {
    let content = document.getElementById('deletedContent');
    let htmlContent = '<div class="deletedCard">';

    htmlContent += '<h1>My deleted Notes</h1>';

    // Hinzufügen des neuen Buttons zum Ausblenden der gelöschten Notizen
    htmlContent += '<button class="hideDeleted" onclick="hideDeletedNotes()">Verstecke gelöschte Notizen</button>';

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

    content.innerHTML = htmlContent;
}

