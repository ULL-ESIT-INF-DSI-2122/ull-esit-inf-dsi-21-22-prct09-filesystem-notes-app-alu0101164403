import 'mocha';
import {expect} from 'chai';
import {AddReduce} from '../../src/ejercicioClase/AddReduce';
import {SubReduce} from '../../src/ejercicioClase/SubReduce';
import {DivReduce} from '../../src/ejercicioClase/DivReduce';
import {ProdReduce} from '../../src/ejercicioClase/ProdReduce';
// import {Reduce} from '../../src/ejercicioClase/Reduce';


describe('Test ejercicio Clase', () => {
  /* function cliente(reduce: Reduce) {
    reduce.run();
  }*/
  describe('Test AddReduce', () => {
    const add: AddReduce = new AddReduce([0, 1, 2, 3, 4, 5]);
    it('se suma la lista de elementos y da 15', () => {
      expect(add.run()).to.be.equal(15);
    });
  });
  describe('Test SubReduce', () => {
    const sub: SubReduce = new SubReduce([0, 1, 2, 3, 4, 5]);
    it('se resta la lista de elementos y da -15', () => {
      expect(sub.operacion()).to.be.equal(-15);
    });
  });
  describe('Test Prodeduce', () => {
    const prod: ProdReduce = new ProdReduce([1, 2, 5]);
    it('se multiplica la lista de elementos y da 10', () => {
      expect(prod.operacion()).to.be.equal(10);
    });
  });
  describe('Test DivReduce', () => {
    const div: DivReduce = new DivReduce([10, 2, 5]);
    it('se divide la lista de elementos y da 1', () => {
      expect(div.operacion()).to.be.equal(1);
    });
  });
});
