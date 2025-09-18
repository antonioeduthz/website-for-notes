$(function() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")
    let isNoteOn = false
    let currentNote = 0
    
    //Botao para criar uma nova note ou salvar uma já existente
    $("#save-btn").on("click", () => {
        console.log(currentNote)
        const title = $("#display-title").val()
        const content = $("#display-content").val()
        if (isNoteOn) {
            notes[currentNote].title = title
            notes[currentNote].content = content
        } else {
            notes.push({title,content})
        }
        $("#display").toggleClass("hide-display")
        localStorage.setItem("notes",JSON.stringify(notes))
        updateNoteList()
    })

    $("#delete-btn").on("click", () => {
        if (isNoteOn) {
            notes.splice(currentNote,1)
            localStorage.setItem("notes",JSON.stringify(notes))   
        }
        $("#display").toggleClass("hide-display")
        updateNoteList()
    })

    $("#add-btn").on("click", () => {
        $("#display").toggleClass("hide-display")
        isNoteOn = false
    })

    //
    function updateNoteList() {
        const template = document.querySelector("#note-template")
        const $wrapper = $('<div/>')
        $("#note-main").empty()
        notes.forEach((element, index) => {
            const clone = template.content.cloneNode(true)
            const $note = $(clone).find(".note")
            $note.find(".note-title").text(element.title)
            $note.find(".note-content").text(element.content)
            $note.attr("id", index)
            $note.on("click", function() {
                const $display = $("#display")
                $display.toggleClass("hide-display")
                $display.find("#display-title").text(element.title)
                $display.find("#display-content").text(element.content)

                currentNote = $(this).attr("id")
                console.log(currentNote)

                isNoteOn = true
            })

            $wrapper.append(clone)
        });
        $("#note-main").append($wrapper.children())
    }

    updateNoteList()
})