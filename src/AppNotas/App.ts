import * as yargs from 'yargs';
import {Note} from './classNote';
import {Colour} from './classColor';
import {ManagementNotes} from './classManagementNotes';
import {ManagementUsers} from './classManagementUsers';
import {User} from './classUser';
import {ShowInfo} from './classShowInfo';
import chalk from 'chalk';


const users: ManagementUsers = ManagementUsers.getManagerUser();

yargs.command({
  command: 'add',
  describe: 'Add a new note.',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title:',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body:',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note colour:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      const color: Colour = new Colour(argv.color);
      const note: Note = new Note(argv.title, argv.body, color);
      if (!users.include(argv.user)) {
        const newUser: User = new User(argv.user);
        users.addUser(newUser);
        const userNotes: ManagementNotes = new ManagementNotes(newUser);
        userNotes.addNote(note);
      } else {
        const user: User = users.getUser(argv.user);
        const userNotes: ManagementNotes = new ManagementNotes(user);
        userNotes.addNote(note);
      }
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List notes from user',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      if (users.include(argv.user)) {
        const user: User = users.getUser(argv.user);
        const userNotes: ShowInfo = new ShowInfo(user);
        userNotes.showTitles();
      } else {
        console.log(chalk.green(`El usuario ${argv.user} no existe, no puede mostrase notas asociadas.`));
      }
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read note',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string' && typeof argv.user === 'string') {
      if (users.include(argv.user)) {
        const user: User = users.getUser(argv.user);
        const note: Note = user.getNote(argv.title);
        note.showInfo();
      } else {
        console.log(chalk.green(`El usuario ${argv.user} no existe, no puede mostrase la nota pedida.`));
      }
    }
  },
});

yargs.command({
  command: 'remove',
  describe: 'Delete note.',
  builder: {
    user: {
      describe: 'Username:',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title:',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      if (users.include(argv.user)) {
        const user: User = users.getUser(argv.user);
        const note: Note = user.getNote(argv.title);
        const userNotes: ManagementNotes = new ManagementNotes(user);
        userNotes.removeNote(note);
      } else {
        console.log(chalk.green(`El usuario ${argv.user} no existe.`));
      }
    }
  },
});

yargs.parse();
