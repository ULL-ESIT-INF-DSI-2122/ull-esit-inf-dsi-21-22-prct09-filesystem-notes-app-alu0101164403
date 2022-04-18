import {Reduce} from './Reduce';

/**
 * clase que implementa el producto de los elementos de una lista
 */
export class ProdReduce extends Reduce {
  constructor(listaElementos: number[]) {
    super(listaElementos);
    this.acumulador = 1;
  }
  public operacion(): number {
    this.listaElementos.forEach((elemento) => this.acumulador *= elemento);
    return this.acumulador;
  }
}
