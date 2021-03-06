const fs = require('fs')
const chalk = require('chalk')
const { recommendCommands } = require('yargs')

//add note function
const addNote = function(title,body){
   const notes = loadNotes()
   
   //check whether a duplicate note is there
   const duplicateNotes = notes.filter(function(note){
      return note.title === title
   })

   const duplicateNote = notes.find((note) => note.title == title)

   //no duplicate note
   if(!duplicateNote){
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

//remove a note
const removeNote = function(title){
   const notes = loadNotes()
   const notesToKeep = notes.filter(function(note){
      return note.title !== title
   })
   if(notes.length > notesToKeep.length){
      console.log(chalk.green.inverse('Note removed'))
      saveNotes(notesToKeep)
   }else{
      console.log(chalk.red.inverse("No note found"))
   }
}

//list a note
const listNote = () => {
   const notes = loadNotes()
   if(notes.length === 0){
      console.log(chalk.red.inverse("Note list is empty"))
   }
   else{
   console.log(chalk.inverse('Your notes'))
   notes.forEach((note) => {
      console.log(note.title)
   })
}
}

//Read a note
const readNote = (title) => {
   const notes = loadNotes()
   const note = notes.find((note) => note.title === title)

   if(note){
      console.log(chalk.inverse(note.title))
      console.log(note.body)
   }else{
      console.log(chalk.inverse.red('Note not found'))
   }
}

//modify the notes in original file
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


//exporting to app.js
module.exports = {
   addNote: addNote,
   removeNote: removeNote,
   listNote: listNote,
   readNote: readNote
}