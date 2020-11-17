const yargs = require('yargs')
const notes = require('./notes')

//Add command
yargs.command({
   command: 'add',
   describe: 'Add a new note',
   builder: {
      title:{
         describe: "Write title",
         demandOption: true,
         type: 'string'
      },
      body:{
         describe: "Write body",
         demandOption: true,
         type: 'string'
      }
   },
   handler: function(argv){
      notes.addNote(argv.title, argv.body)
   }
})

//remove command
yargs.command({
   command: 'remove',
   describe: 'Remove a note',
   builder: {
      title:{
         describe: "Note title",
         demandoption: true,
         type: "string"
      }
   },
      handler: function(argv){
         notes.removeNote(argv.title)
      }
})

yargs.parse()