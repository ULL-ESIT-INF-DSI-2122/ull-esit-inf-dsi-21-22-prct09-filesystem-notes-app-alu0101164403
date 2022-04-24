import {Note} from './classNote';
import chalk from 'chalk';

/**
 * clase que representa un usuario, sus atrbutos son un set de notas
 */
export class User {
  private listNotes: Set<Note> = new Set([]);
  /**
   * el contructor recibe el nombre del usuaui y opcionalmente una lista de notas
   * @param userName string
   * @param listNotes Set<Note>, opcional
   */
  constructor(private userName: string, listNotes?: Set<Note>) {
    if (listNotes) {
      this.listNotes = listNotes;
    }
    // comprobar si ya existe
  }

  /**
   * devuelve el nombre
   * @returns string
   */
  public getUserName(): string {
    return this.userName;
  }
  /**
   * devuelve la lista de notas
   * @returns Set<Note>
   */
  public getListNotes(): Set<Note> {
    return this.listNotes;
  }
  /**
   * devuelve una lista con los titulos de las notas
   * @returns string[]
   */
  public getTitlesNotes(): string[] {
    const arrayNotes: Note[] = Array.from(this.listNotes);
    if (arrayNotes.length > 0) {
      return arrayNotes.map((note) => note.getTitle());
    } else {
      throw Error(chalk.red(`El usuario ${this.userName} no tiene notas creadas.`));
    }
  }
  /**
   * busca una nota por su nombre y la devuelve
   * @param titleNote string
   * @returns Note
   */
  public getNote(titleNote: string): Note {
    const arrayNotes: Note[] = Array.from(this.listNotes);
    const note: Note | undefined = arrayNotes.find((note) => note.getTitle() === titleNote);
    if (note !== undefined) {
      return note;
    } else {
      throw Error(chalk.red(`La nota ${titleNote} no fue encontrada.`));
    }
  }
  /**
   * modifica el nombre del usuario
   * @param newName string
   */
  public setUserName(newName: string): void {
    // comprobar nombre repetido**
    this.userName = newName;
  }
  /**
   * modifica la lista de notas
   * @param newList Set>note>
   */
  public setListNotes(newList: Set<Note>): void {
    this.listNotes = newList;
  }
}
