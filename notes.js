const util = require('util');
const fs = require('fs');
const uuid = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFileAsync('./db/db.json', 'utf8');
  }

  getNotes() {
    return this.read()
    .then((notes) => {
      let notesArray = [].concat(JSON.parse(notes));
      return notesArray;
    });
  }

  write(note) {
    return writeFileAsync('./db/db.json', JSON.stringify(note));
  }

  postNote(note) {
    const noteTitle = note.title;
    const noteText = note.text;
    const noteID = uuid();

    const newNote = { noteTitle, noteText, noteID };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }

}

module.exports = new Notes();
