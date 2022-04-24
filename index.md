# PRÁCTICA 9. Aplicación de procesamiento de notas de texto

Asignatura: Desarrollo de sistemas informáticos

Curso: 3º, 2021/22

Ainoa Iglesias Dasilva, alu0101164403@ull.edu.es


### CLASES

- COLOR: esta clase representa un color válido para las notas, su nombre debe ser equivalente al usando con chalk.

```ts
export class Colour {
  private colour: string;
  constructor(color: string) {
    if (color === 'red' || color === 'green' || color === 'blue' || color === 'yellow') {
      this.colour = color;
    } else {
      throw Error(chalk.red('El color no es correcto.'));
    }
  }
  public getColour(): string {
    return this.colour;
  }
}
```

- USER: esta clase representa un usuario, guarda el nombre del usuario y una lista de sus notas con un Set en los atributos. Los métodos que contiene son getters y setters de los atributos además de otros dos getters que devuelven una nota que se busca por el nombre y otro que devuelve la lista de títulos de las notas del usuario.

```ts
export class User {
  private listNotes: Set<Note> = new Set([]);

  constructor(private userName: string, listNotes?: Set<Note>) {
    if (listNotes) {
      this.listNotes = listNotes;
    }
  }
  // GETTERS
  public getUserName(): string {
    return this.userName;
  }
  public getListNotes(): Set<Note> {
    return this.listNotes;
  }
  public getTitlesNotes(): string[] {
    const arrayNotes: Note[] = Array.from(this.listNotes);
    if (arrayNotes.length > 0) {
      return arrayNotes.map((note) => note.getTitle());
    } else {
      throw Error(chalk.red(`El usuario ${this.userName} no tiene notas creadas.`));
    }
  }
  public getNote(titleNote: string): Note {
    const arrayNotes: Note[] = Array.from(this.listNotes);
    const note: Note | undefined = arrayNotes.find((note) => note.getTitle() === titleNote);
    if (note !== undefined) {
      return note;
    } else {
      throw Error(chalk.red(`La nota ${titleNote} no fue encontrada.`));
    }
  }
  // SETTERS
  public setUserName(newName: string): void {
    this.userName = newName;
  }
  public setListNotes(newList: Set<Note>): void {
    this.listNotes = newList;
  }
}
```

- NOTE: esta clase representa una Nota, guardando el título, cuerpo y color (con tipo Colour) de la nota. Los métodos que contiene son los getters y setters de los atriutos además de un método para mostrar por consola la información de la nota.

```ts
export class Note {
  constructor(private title: string, private body: string, private colour: Colour) {
  }
  // GETTERS
  public getTitle(): string {
    return this.title;
  }
  public getBody(): string {
    return this.body;
  }
  public getColour(): Colour {
    return this.colour;
  }
  // SETTERS
  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }
  public setBody(newBody: string): void {
    this.body = newBody;
  }
  public setColour(newColour: Colour): void {
    this.colour = newColour;
  }
  // SHOW INFO NOTE
  public showInfo(): string {
    const info: string = `-Titulo: ${this.title}\n-Cuerpo: ${this.body}\n-Color: ${this.colour.getColour()}`;
    console.log(info);
    return info;
  }
}
```

- SHOWINFO: esta clase representa maneras de mostrar la info de las notas de un usuario. En este caso solo contiene un método con el que se muestra la lista de títulos de las nostas de un usuario. Esta clase se hizo para cumplir con el principio SOLiD Single responsibility principle.

```ts
export class ShowInfo {
  constructor(private user: User) {
  }
  public showTitles(): void {
    console.log(`Notas del usuario ${this.user.getUserName()}:`);
    this.user.getListNotes().forEach((note) => console.log(note.getTitle()));
  }
}
```

- MANAGEMENTNOTE: esta clase representa la gestión para las notas y tiene como atributo un usuario, es decir, los métodos para añadir, modiifcar y eliminar una nota. Para el método addNote primero se comprueba si el usuario tiene alguna nota creada y además el título de las nota que se quiere añadir coincide con alguna existente, en ese caso se mostrara un mensaje de error por la consola. En caso de no existir una nota con ese título, se procede a añadir la nota a la lista de notas del usuario y a crear el json en el directorio correspondiente. Para eliminar una nota, primero se comprueba que la nota existe buscando su título (ya que el título es único de cada nota), si no se encuentra se lanzará un mensaje de error por la consola y en caso de ser encontrada se elimina la nota de la lista de notas del usuario y se elimna el fichero json correspondiente. Para modificar una nota, al igual que en los anteriores se comprueba la existencia de la nota a modificar, se cambia los valores en el objeto nota del usuario y se modifica el json con los nuevos valores. 

```ts
export class ManagementNotes {
  constructor(private user: User) {
  }
  // GESTION NOTAS
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

```

- MANAGEMENTUSER: esta clase representa la gestión de un usuario, esto es, añadir un usuario nuevo, eliminar o buscar un usuario y contiene como atributo la lista de usuarios existentes (se usa Set para aporvechar los métodos de esta estrctura de datos). Esta clase es estática, cuando se llama por primera vez, en el constructor se lee el directorio donde se guardan las carpetas de lso usuarios y sus notas, para comprobar que usuarios existen y cuales son sus notas, para ello, se lee los nombres de los directorios dentro de la carpeta ./NotasJson, esos nombres son equivalentes a los nombres de los usuarios existentes (se leen con la función getDirectories()). Después se lee los json con las notas, se crean los objetos Note y se añaden al usuario. Y por último se añade el usuario al atributo de la clase que los guarda. Con esto lo que se consigue es saber y tener alamacenados los usuarios con sus respectivas notas cuando se ejecuta el programa.
En los métodos de esta clase tenemos un addUser y deleteUser los cuales se encargan de crear/eliminar el usuario y su directorio.

```ts
export class ManagementUsers {
  private listUsers: Set<User> = new Set();
  private static managerUser: ManagementUsers;

  constructor() {
    const usersNames: string[] = getDirectories('./NotasJson');
    usersNames.forEach((userName) => {
      const user: User = new User(userName);
      const jsonList = getJsons(`./NotasJson/${userName}`);
      const listNotes: Note[] = jsonList.map((json) => new Note(json.title, json.body, new Colour(json.colour)));
      user.setListNotes(new Set(listNotes));
      this.listUsers.add(user);
    });
  }
  public static getManagerUser(): ManagementUsers {
    if (!ManagementUsers.managerUser) {
      ManagementUsers.managerUser = new ManagementUsers;
    }
    return ManagementUsers.managerUser;
  }
  public getUsers(): Set<User> {
    return this.listUsers;
  }
  private getUserNames(): string[] {
    const list: User[] = Array.from(this.listUsers);
    const listNames: string[] = list.map((user) => user.getUserName());
    return listNames;
  }
  public getUser(name: string): User {
    const users: User[] = Array.from(this.listUsers);
    const user: User | undefined = users.find((user) => user.getUserName() === name);
    if (user !== undefined) {
      return user;
    } else {
      throw Error(chalk.red(`Cannot find user ${name}`));
    }
  }
  public addUser(newUser: User): void {
    const dir: string = `./NotasJson/${newUser.getUserName()}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
      this.listUsers.add(newUser);
      console.log(chalk.green(`Se ha creado y añadido el usuario ${newUser.getUserName()}`));
      console.log(chalk.green(`Se ha creado el directorio para el usuario ${newUser.getUserName()}`));
    } else {
      console.log(chalk.green(`Ya existe el directorio para el usuario ${newUser.getUserName()}`));
    }
  }
  public deleteUser(user: User): void {
    const dir: string = `./NotasJson/${user.getUserName()}`;
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, {recursive: true, force: true});
      console.log(chalk.green(`Se ha eliminado el directorio para el usuario ${user.getUserName()}`));
    }
    this.listUsers.delete(user);
    console.log(chalk.green(`Se ha eliminado el usuario ${user.getUserName()}`));
  }
  public include(nameUser: string): boolean {
    return this.getUserNames().includes(nameUser);
  }
}
function getDirectories(source: string): string[] {
  return fs.readdirSync(source, {withFileTypes: true}).filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
}
function getJsons(source: string) {
  const filesNames: string[] = fs.readdirSync(source, {withFileTypes: true}).map((file) => file.name);
  return filesNames.map((fileName) => JSON.parse(fs.readFileSync(`${source}/${fileName}`, 'utf8')));
}
```


### APP

Este fichero contiene los comandos de la aplicación. Primero se llama a la clase ManagementUsers para que lea los usuarios y notas existentes, luego, con yargs, se crean los comandos con los que se añade, elimina, lista y muestra una nota. En todos los casos se hace una comprobación de si existe el usuario introdido y según el caso mostrara un mensaje de error o llamara al método que crea un usurio.

```ts
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
```

### TEST

Para los test se crean objetos concretos para las comprobaciones para que no se modifique los que se creen en la linea de comandos.

```ts
describe('Test de la clase User', () => {
  const blue: Colour = new Colour('blue');
  const nota: Note = new Note('notaAlu', 'cuerpo', blue);
  const setNotas: Set<Note> = new Set([nota]);
  const usuario: User = new User('alu', setNotas);
  const usuario2: User = new User('usu2');
  it('Se comprueba que se crea objeto correctamente', () => {
    expect(usuario instanceof User).to.be.true;
  });
  describe('Test de getters', () => {
    it('Se comprueba getUSerName', () => {
      expect(usuario.getUserName()).to.be.equal('alu');
    });
    it('Se comprueba getListNotes', () => {
      expect(usuario.getListNotes()).to.be.equal(setNotas);
    });
    it('Se comprueba getTitlesNotes', () => {
      expect(usuario.getTitlesNotes()).to.deep.eq(['notaAlu']);
    });
    it('Se comprueba que getTitlesNotes envia error si no hay notas', () => {
      expect(() => {
        usuario2.getTitlesNotes();
      }).throw('El usuario usu2 no tiene notas creadas.');
    });
    it('Se comprueba getNote', () => {
      expect(usuario.getNote('notaAlu')).to.be.equal(nota);
    });
    it('Se comprueba que getNote envia error si no encuentra la nota', () => {
      expect(() => {
        usuario.getNote('error');
      }).throw('La nota error no fue encontrada.');
    });
  });
  describe('Test de getters', () => {
    it('Se comprueba setUserName', () => {
      usuario.setUserName('nuevo nombre');
      expect(usuario.getUserName()).to.be.equal('nuevo nombre');
    });
    it('Se comprueba setListNotes', () => {
      const nota2: Note = new Note('nota2', 'nota2', blue);
      const nuevoSet: Set<Note> = new Set([nota2]);
      usuario.setListNotes(nuevoSet);
      expect(usuario.getListNotes()).to.be.equal(nuevoSet);
    });
  });
});
```

```ts
describe('Test clase Colour', () => {
  const blue: Colour = new Colour('blue');
  it('Se crea correctamente un Colour, blue', () => {
    expect(blue instanceof Colour).to.be.true;
  });
  it('Se comprueba que no se crea color incorrecto, black', () => {
    expect(() => {
      new Colour('black');
    }).to.throw('El color no es correcto.');
  });
  it('Se devuelve el color como string, blue', () => {
    expect(blue.getColour()).to.be.equal('blue');
  });
});
```

```ts
describe('Test clase ManagementNotes', () => {
  const blue: Colour = new Colour('blue');
  const nota: Note = new Note('notaAlu', 'cuerpo', blue);
  const nota2: Note = new Note('notaAlu', 'cuerpo2', blue);
  const usuario: User = new User('alu');
  const manager: ManagementNotes = new ManagementNotes(usuario);
  it('Se comprueba addNote e include', () => {
    manager.addNote(nota);
    expect(manager.inlcude(nota)).to.be.true;
  });
  it('Se comprueba addNote da error', () => {
    expect(() => {
      manager.addNote(nota2);
    }).throw(`There is already a note with the title -> 'notaAlu' for the user alu.`);
  });
  it('Se comprueba modifyNote', () => {
    manager.modifyNote(nota, 'nuevo tit', 'nuevo cuerpo', blue);
    expect(nota.getTitle()).to.be.equal('nuevo tit');
  });
  it('Se comprueba modifyNote da error', () => {
    expect(() => {
      manager.modifyNote(nota2, 'tit', 'otro', blue);
    }).throw('The chosen note cannot be modified because it does not exist, you can create a new note.');
  });
  it('Se comprueba removeNote da error', () => {
    expect(() => {
      manager.removeNote(nota2);
    }).throw('The note to delete was not found.');
  });
  it('Se comprueba removeNote', () => {
    manager.removeNote(nota);
    expect(manager.inlcude(nota)).to.be.false;
  });
});
```

```ts
describe('Test de classManagementUsers', () => {
  const blue: Colour = new Colour('blue');
  const nota: Note = new Note('notaAlu', 'cuerpo', blue);
  const setNotas: Set<Note> = new Set([nota]);
  const usuario: User = new User('usu1', setNotas);
  const usuario2: User = new User('usu2');
  const managerUser: ManagementUsers = ManagementUsers.getManagerUser();
  it('Se comprueba addUser', () => {
    managerUser.addUser(usuario);
    managerUser.addUser(usuario2);
    expect(managerUser.include(usuario.getUserName())).to.be.true;
  });
  it('Se comprueba getUsers', () => {
    const listUser = managerUser.getUsers();
    expect(managerUser.getUsers()).to.be.equal(listUser);
  });
  it('Se comprueba getUser', () => {
    expect(managerUser.getUser('usu1')).to.be.eq(usuario);
  });
  it('Se comprueba getUser da error', () => {
    expect(() => {
      managerUser.getUser('error');
    }).throw('Cannot find user error');
  });
  it('Se comprueba deleteUser e include', () => {
    managerUser.deleteUser(usuario2);
    expect(managerUser.include('usu2')).to.be.false;
    managerUser.deleteUser(usuario);
  });
});
```

```ts
describe('Test de la clase Note', () => {
  const blue: Colour = new Colour('blue');
  const nota: Note = new Note('nueva nota', 'hola', blue);
  it('Se crea una nota correctamente', () => {
    expect(nota instanceof Note).to.be.true;
  });
  describe('Test de getters', () => {
    it('Se comprueba getTitle', () => {
      expect(nota.getTitle()).to.be.equal('nueva nota');
    });
    it('Se comprueba getBody', () => {
      expect(nota.getBody()).to.be.equal('hola');
    });
    it('Se comprueba getColour', () => {
      expect(nota.getColour()).to.be.equal(blue);
    });
  });
  describe('Test de setters', () => {
    it('Se comprueba setTitle', () => {
      nota.setTitle('nueva set');
      expect(nota.getTitle()).to.be.equal('nueva set');
    });
    it('Se comprueba setBody', () => {
      nota.setBody('hola hola');
      expect(nota.getBody()).to.be.equal('hola hola');
    });
    it('Se comprueba setColour', () => {
      const red: Colour = new Colour('red');
      nota.setColour(red);
      expect(nota.getColour()).to.be.equal(red);
    });
  });
  describe('Test show', () => {
    it('Se comprueba showInfo', () => {
      expect(nota.showInfo()).to.be.equal(`-Titulo: nueva set\n-Cuerpo: hola hola\n-Color: red`);
    });
  });
});
```

### OBSERVACIÓN

En la clase ManagementUser se hace uso de una funcón de fs, 'fs.rmSync', la cual da un error en la github Actions de los test, creo que es debido a una incompatibilidad en la versión en la que falla.