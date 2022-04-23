import 'mocha';
import {expect} from 'chai';
import {Colour} from '../../src/AppNotas/classColor';

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
    expect(blue.getColor()).to.be.equal('blue');
  });
});
