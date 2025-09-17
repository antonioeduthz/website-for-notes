$(function() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]")
    let isNoteOn = false
    let currentNote = 0
    
    //Botao para criar uma nova note ou salvar uma já existente
    $("save-btn").on("click", () => {
        const title = $("#note-title").val()
        const content = $("#note-content").val()
        if (isNoteOn) {
            notes[currentNote][0] = title
            notes[currentNote][1] = content
        } else {
            notes.push({title: title,content: content})
        }   
        localStorage.setItem("notes",JSON.stringify(notes))
        updateDOM()
    })

    $("#delete-btn").on("click", () => {
        if (isNoteOn) {
            notes.splice(noteIndex,1)
            localStorage.setItem("notes",JSON.stringify(notes))   
        }
        $("")
    })

    function updateDOM() {
        const $frag = $()
        notes.forEach(element => {
            const $template = $(".note-template").find(".note-preview").clone()
            
            $template.find(".title-preview").text(element[0])
            $template.find(".p-preview").text(element[1])
            $frag.append(template)
        });
        $("#note-main").append($frag)
    }
})