// import chalk from 'chalk';
import {User} from './classUser';

/**
 * clase que representa como se muestra la informacion de las notas de un usuario
 */
export class ShowInfo {
  /**
   * el constructor recibe un usuario
   * @param user User
   */
  constructor(private user: User) {
  }
  /**
   * muestra por consola una lista de titulos de la snotas del usuario
   */
  public showTitles(): void {
    console.log(`Notas del usuario ${this.user.getUserName()}:`);
    this.user.getListNotes().forEach((note) => console.log(note.getTitle()));
  }
}
