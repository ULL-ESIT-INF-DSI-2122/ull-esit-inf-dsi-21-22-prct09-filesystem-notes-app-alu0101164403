import {User} from './classUser';
import {Note} from './classNote';
import {Colour} from './classColor';
import chalk from 'chalk';
import * as fs from 'fs';

/**
 * clase que representa la gestion de las notas, añadir/eliminar/modificar
 */
export class ManagementNotes {
  constructor(private user: User) {
  }
  /**
   * añade una nueva nota al usuario dado y se crea el json con la nota
   * @param newNote Note
   */
  public addNote(newNote: Note): void {
    if (this.user.getListNotes().size > 0 && this.user.getTitlesNotes().includes(newNote.getTitle())) {
      throw Error(chalk.red(`There is already a note with the title -> '${newNote.getTitle()}' for the user ${this.user.getUserName()}.`));
    } else {
      this.user.getListNotes().add(newNote);
      const dir: string = `./NotasJson/${this.user.getUserName()}/${newNote.getTitle()}.json`;
      const jsonToStore = {
        'title': newNote.getTitle(),
        'colour': newNote.getColour().getColour(),
        'body': newNote.getBody(),
      };
      fs.writeFileSync(dir, JSON.stringify(jsonToStore));
      console.log(chalk.green(`The note was added correctly.`));
    }
  }
  /**
   * se modifica la nota pedida y se modifica el json correspondiente
   * @param note Note
   * @param newTitle string
   * @param newBody string
   * @param newColour string
   */
  public modifyNote(note: Note, newTitle: string, newBody: string, newColour: Colour): void {
    if (this.user.getTitlesNotes().includes(note.getTitle())) {
      note.setBody(newBody);
      note.setColour(newColour);
      note.setTitle(newTitle);
      const dir: string = `./NotasJson/${this.user.getUserName()}/${note.getTitle()}.json`;
      const jsonToStore = {
        'title': newTitle,
        'colour': newColour.getColour(),
        'body': newBody,
      };
      const fd = fs.openSync(dir, 'w');
      fs.writeFileSync(fd, JSON.stringify(jsonToStore));
      fs.closeSync(fd);
      console.log(chalk.green(`The note has been modified correctly, the new data is: 
      - Title: ${note.getTitle()},
      - Body: ${note.getBody()},
      - Colour: ${note.getColour()}`));
    } else {
      throw Error(chalk.red('The chosen note cannot be modified because it does not exist, you can create a new note.'));
    }
  }
  /**
   * elimina la nota pedida y su json
   * @param note Note
   */
  public removeNote(note: Note): void {
    if (this.user.getTitlesNotes().includes(note.getTitle())) {
      this.user.getListNotes().delete(note);
      const dir: string = `./NotasJson/${this.user.getUserName()}/${note.getTitle()}.json`;
      fs.unlinkSync(dir);
      console.log(chalk.green(`The note was deleted correctly.`));
    } else {
      throw Error(chalk.red(`The note to delete was not found.`));
    }
  }
  public inlcude(note: Note): boolean {
    return this.user.getListNotes().has(note);
  }
}
