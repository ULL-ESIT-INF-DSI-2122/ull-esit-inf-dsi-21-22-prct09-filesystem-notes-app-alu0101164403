// import chalk from 'chalk';
import {User} from './classUser';

export class ShowInfo {
  constructor(private user: User) {
  }

  public showTitles(): void {
    console.log(`Notas del usuario ${this.user.getUserName()}:`);
    this.user.getListNotes().forEach((note) => console.log(note.getTitle()));
  }
}
