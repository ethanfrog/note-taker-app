const util = require('util');
const fs = require('fs');
const uuid = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  getNotes() {
    return this.read()
    .then((notes) => {
      // Initialize the notes array as empty
      let notesArray = [];
      // Insert existing notes into the notes array
      notesArray.concat(JSON.parse(notes));
      return notesArray;
    });
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }

  postNote(note) {
    const noteTitle = note.title;
    const noteText = note.text;
    // Generates a unique ID for each note
    const noteID = uuid();

    const newNote = { noteTitle, noteText, noteID };

    return this.getNotes()
    // Add the new note to the set of existing notes
    .then((notes) => [...notes, newNote])
    // Rewrite the set of notes that was just altered
    .then((notes) => this.write(notes))
    .then(() => newNote);
  }

}

module.exports = new Notes();
