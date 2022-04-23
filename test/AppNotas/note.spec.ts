import 'mocha';
import {expect} from 'chai';
import {Note} from '../../src/AppNotas/classNote';
import {Colour} from '../../src/AppNotas/classColor';


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
