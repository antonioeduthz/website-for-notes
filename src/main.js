const notes = JSON.parse(localStorage.getItem("notes") || "[]")


//Elementos do display
const display = document.querySelector("#display");
const noteTitle = document.querySelector("#note-title");
const noteContent = document.querySelector("#note-content");
const saveButton = document.querySelector("#save-btn");
const deleteButton = document.querySelector("#delete-btn");
let isDisplayOn = false;
let isNoteOn = false;
let noteIndex;

//Misc
const main = document.querySelector("main");
const template = document.getElementById("note-template")
const addButton = document.querySelector("#add-btn");
const noteMain = document.getElementById("note-main");

//funções para salvar, atualizar e deletar
function SaveData(title, content)
{
    notes.push([title,content]);
    updateNotes();
    localStorage.setItem("notes",JSON.stringify(notes));
}
function updateData()
{
    notes[noteIndex][0] = noteTitle.value;
    notes[noteIndex][1] = noteContent.value;
    updateNotes();
    localStorage.setItem("notes",JSON.stringify(notes));
}
function deleteData()
{
    notes.splice(noteIndex,1);
    updateNotes();
    localStorage.setItem("notes",JSON.stringify(notes));    
}

//Atualiza a lista de notas 
function updateNotes()
{
    noteMain.innerHTML = "";
    notes.forEach((element,index) => {
        let clone = template.content.cloneNode(true);
        const previewNote = clone.querySelector(".note-preview")
        const fade = clone.querySelector(".fade");
        previewNote.setAttribute("id", index);
        clone.querySelector(".title-preview").textContent = element[0];
        clone.querySelector(".p-preview").textContent = element[1];
        previewNote.addEventListener('click', () => {
            noteTitle.value = element[0];
            noteContent.value = element[1];
            deleteButton.textContent = "Delete";
            display.style.scale = 1;
            isDisplayOn = true;
            isNoteOn = true;
            noteIndex = previewNote.id;
        });
        noteMain.append(clone);
        if (previewNote.scrollHeight < 250) {
            fade.style.scale = 0;
        }
    });
}

//Limpa o display da nota
function clearDisplay()
{
    noteTitle.value = "";
    noteContent.value = "";
}

//Abre o display para criar notas
addButton.addEventListener('click', () => {
    if (!isDisplayOn) {
        display.style.scale = 1;
        isDisplayOn = true;
    } else {
        display.style.scale = 0;
        isDisplayOn = false;
        isNoteOn = false;
    }
    deleteButton.textContent = "Close";
    clearDisplay();
});

//Salva notas
saveButton.addEventListener('click', () => {
    const title = noteTitle.value;
    const content = noteContent.value;
    if (isNoteOn) {
        updateData()
    }
    else {
        SaveData(title, content); 
    }
    display.style.scale = 0;
    deleteButton.textContent = "Close";
    isDisplayOn = false;
    isNoteOn = false;
    clearDisplay();
});

//Deleta a nota ou fecha o display(caso for criar uma nota)
deleteButton.addEventListener('click', () => {
    if (isNoteOn) {
        deleteData();
    }
    display.style.scale = 0;
    isDisplayOn = false;
    isNoteOn = false;
    clearDisplay();
});