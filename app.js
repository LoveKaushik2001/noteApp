const yargs = require('yargs')
const notes = require('./notes')
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

yargs.parse()