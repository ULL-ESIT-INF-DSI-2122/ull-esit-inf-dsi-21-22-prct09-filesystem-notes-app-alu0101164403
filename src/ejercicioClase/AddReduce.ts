import {Reduce} from './Reduce';

/**
 * clase que implementa la suma de los elementos de una lista
 */
export class AddReduce extends Reduce {
  constructor(listaElementos: number[]) {
    super(listaElementos);
  }
  public operacion(): number {
    this.listaElementos.forEach((elemento) => this.acumulador += elemento);
    return this.acumulador;
  }
}
