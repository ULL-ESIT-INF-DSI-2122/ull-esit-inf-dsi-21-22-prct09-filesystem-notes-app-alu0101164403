import {Reduce} from './Reduce';

/**
 * clase que implementa la division de los elementos de una lista
 */
export class DivReduce extends Reduce {
  constructor(listaElementos: number[]) {
    super(listaElementos);
    this.acumulador = 1;
  }
  after() {
    console.log('El acumulador inicia en 1');
  }
  public operacion(): number {
    // eslint-disable-next-line max-len
    this.acumulador = this.listaElementos[0];
    for (let i = 1; i < this.listaElementos.length; i++) {
      this.acumulador /= this.listaElementos[i];
    }
    return this.acumulador;
  }
}
