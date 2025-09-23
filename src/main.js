$(function() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")
    const template = document.querySelector("#note-template")
    let noteRead = false
    let currentNote = 0

    //Botão para abrir uma nova anotação
    $("#add-btn").on("click", () => {
        $("#display").toggleClass("hide")
        clearDisplay()
        noteRead = false

    })

    $("#save-btn").on("click", saveData)

    $("#delete-btn").on("click", deleteData)



    function validateData(title, content) {
        if(title.trim() !== "" || content.trim() !== ""){
            return {title,content,check: true}
        }
        else return{check: false}
    }

    function saveData() {
        const title = $("#display-title").val()
        const content = $("#display-content").val()
        console.log(title)
        const data = validateData(title,content)
        if (noteRead === false && data.check) {
            notes.push(data)
        } else if(data.check){
            notes[currentNote].title = data.title
            notes[currentNote].content = data.content
        }
        $("#display").toggleClass("hide")
        localStorage.setItem("notes",JSON.stringify(notes))
        updateNoteList()
        noteRead = false
    }

    function deleteData() {
        if (noteRead === true) {
            notes.splice(currentNote,1)
            localStorage.setItem("notes",JSON.stringify(notes))
            $("#display").toggleClass("hide")
            updateNoteList()            
        }
        noteRead = false
    }

    function clearDisplay() {
        const $display = $("#display")
        $display.find("#display-title").val('')
        $display.find("#display-content").val('')
    }

    function updateNoteList() {
        const $wrapper = $('<div/>')

        $("#note-main").empty()
        clearDisplay()
        
        notes.forEach((element, index) => {
            console.log(element)
            const clone = template.content.cloneNode(true)
            const $note = $(clone).find(".note")

            $note.find(".note-title").text(element.title)
            $note.find(".note-content").text(element.content)
            $note.attr("id", index)

            $note.on("click", function() {
                const $display = $("#display")

                $display.toggleClass("hide")
                $display.find("#display-title").val(element.title)
                $display.find("#display-content").val(element.content)
                currentNote = $(this).attr("id")
                noteRead = true
            })
            $wrapper.append(clone)
        });
        $("#note-main").append($wrapper.children())
    }    

    updateNoteList()
})