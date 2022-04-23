import 'mocha';
import {expect} from 'chai';
import {Note} from '../../src/AppNotas/classNote';
import {Colour} from '../../src/AppNotas/classColor';
import {User} from '../../src/AppNotas/classUser';


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
