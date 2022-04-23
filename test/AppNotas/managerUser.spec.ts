import 'mocha';
import {expect} from 'chai';
import {Note} from '../../src/AppNotas/classNote';
import {Colour} from '../../src/AppNotas/classColor';
import {User} from '../../src/AppNotas/classUser';
import {ManagementUsers} from '../../src/AppNotas/classManagementUsers';

describe('Test de classManagementUsers', () => {
  const blue: Colour = new Colour('blue');
  const nota: Note = new Note('notaAlu', 'cuerpo', blue);
  const setNotas: Set<Note> = new Set([nota]);
  const usuario: User = new User('alu', setNotas);
  const usuario2: User = new User('usu2');
  const setUsu: Set<User> = new Set([usuario, usuario2]);
  const managerUser: ManagementUsers = ManagementUsers.getManagerUser();
  it('Se comprueba addUser y getUsers', () => {
    managerUser.addUser(usuario);
    managerUser.addUser(usuario2);
    expect(managerUser.getUsers()).to.deep.eq(setUsu);
  });
  it('Se comprueba getUser', () => {
    expect(managerUser.getUser('alu')).to.be.equal(usuario);
  });
  it('Se comprueba getUser da error', () => {
    expect(() => {
      managerUser.getUser('error');
    }).throw('Cannot find user error');
  });
  it('Se comprueba deleteUser e include', () => {
    managerUser.deleteUser(usuario2);
    expect(managerUser.include('usu2')).to.be.false;
    expect(managerUser.include('alu')).to.be.true;
    managerUser.deleteUser(usuario);
  });
});
