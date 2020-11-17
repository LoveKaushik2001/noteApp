const fs = require('fs')

//add note function
const addNote = function(title,body){
   const notes = loadNotes()
   
   //check whether a duplicate note is there
   const duplicateNotes = notes.filter(function(note){
      return note.title === title
   })

   //no duplicate note
   if(duplicateNotes.length === 0){
      notes.push({
         title: title,
         body: body
      })
      saveNotes(notes)
   }
   //duplicate note is present
   else{
      console.log('Title is already taken')
   }
}

//append the notes
const saveNotes = function(notes){
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

//Check whether the file exist or not
const loadNotes = function(){
   try{
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   }catch(e){
      return []
   }
}

module.exports = {
   addNote: addNote
}