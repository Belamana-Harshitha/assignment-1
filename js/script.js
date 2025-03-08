const containerElement = document.getElementById('container');
const btnAdd = document.getElementsByClassName('btn-add')[0];
const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');
function getAppStorage() {
    return JSON.parse(localStorage.getItem("notes-app") || "[]");
}
getAppStorage().forEach(element => {
    const textElement = createTextElement(element.id, element.content);
    containerElement.insertBefore(textElement, btnAdd);
});
function createTextElement(id, content) {
    const textElement = document.createElement('textarea');
    textElement.value = content;
    textElement.classList.add('sticky');
    textElement.placeholder = 'Enter your notes';
    textElement.addEventListener("change", () => {
        updateNote(id, textElement.value);
    });
    textElement.addEventListener("dblclick", () => {
        showDeleteModal(id, textElement);
    });
    return textElement;
}
function addStickyNote() {
    const notes = getAppStorage();
    const noteObject = {
        id: Math.floor(Math.random() * 1000),
        content: ""
    };
    const textElement = createTextElement(noteObject.id, noteObject.content);
    containerElement.insertBefore(textElement, btnAdd);
    notes.push(noteObject);
    saveNote(notes); 
}
btnAdd.addEventListener('click', () => addStickyNote());
function saveNote(notes) {
    localStorage.setItem("notes-app", JSON.stringify(notes));
}
function updateNote(id, content) {
    const notes = getAppStorage();
    const updateElement = notes.filter((note) => note.id == id)[0];
    updateElement.content = content;
    saveNote(notes);
}
function deleteNote(id, textElement) {
    const notes = getAppStorage().filter((note) => note.id != id);
    saveNote(notes);
    containerElement.removeChild(textElement);
}
let currentTextElement;
let currentNoteId;
function showDeleteModal(id, textElement) {
    currentNoteId = id;
    currentTextElement = textElement;
    deleteModal.style.display = 'block';
}
confirmDelete.addEventListener('click', () => {
    deleteNote(currentNoteId, currentTextElement);
    deleteModal.style.display = 'none';
});
cancelDelete.addEventListener('click', () => {
    deleteModal.style.display = 'none';
});