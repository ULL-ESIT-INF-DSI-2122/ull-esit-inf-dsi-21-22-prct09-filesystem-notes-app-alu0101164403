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
