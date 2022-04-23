import 'mocha';
import {expect} from 'chai';
import {Note} from '../../src/AppNotas/classNote';
import {Colour} from '../../src/AppNotas/classColor';
import {User} from '../../src/AppNotas/classUser';
import {ManagementNotes} from '../../src/AppNotas/classManagementNotes';

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
