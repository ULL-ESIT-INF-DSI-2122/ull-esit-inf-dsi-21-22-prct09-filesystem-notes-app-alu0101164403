import chalk from 'chalk';
import {User} from './classUser';
import * as fs from 'fs';

export class ManagementUsers {
  private listUsers: Set<User> = new Set();
  private static managerUser: ManagementUsers;

  constructor() {
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
    /*
    if (listNames.length == 0) {
      throw Error(chalk.red(`No hay usuarios en la base de datos.`));
    } else {
      return listNames;
    }*/
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
    this.listUsers.add(newUser);
    const dir: string = `./NotasJson/${newUser.getUserName()}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
      console.log(`Se ha creado el directorio para el usuario ${newUser}`);
    } else {
      console.log(`Ya existe el directorio para el usuario ${newUser}`);
    }
    console.log(chalk.green(`Se ha creado y añadido el usuario ${newUser.getUserName()}`));
  }
  public deleteUser(user: User): void {
    this.listUsers.delete(user);
    console.log(chalk.green(`Se ha eliminado el usuario ${user.getUserName()}`));
    const dir: string = `./NotasJson/${user}`;
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, {recursive: true, force: true});
      console.log(`Se ha eliminado el directorio para el usuario ${user}`);
    }
  }
  public include(nameUser: string): boolean {
    return this.getUserNames().includes(nameUser);
  }
}
