/**
 * Clase padre abstracta que se implementa con un
 * patron de plantilla
 * Tiene como atributos una lista de numeros y aun acumulador
 */
export abstract class Reduce {
  protected listaElementos: number[];
  protected acumulador: number;
  /**
   * el constructor recibe una lista de numeros con el
   * que las clases hijas harán las operaciones correspondientes
   * @param lista number[]
   */
  constructor(lista: number[]) {
    this.listaElementos = lista;
    this.acumulador = 0;
  }

  // operacion comun recorrer lista
  /**
   * método que ejecuta los pasos del algoritmo
   */
  public run() {
    this.after();
    this.operacion();
    this.before();
    return this.acumulador;
  }

  /**
   * metodo opcional que realiza alguna operacion o paso antes de un paso
   * critico en el algortimo
   */
  protected after() {}
  /**
   * metodo opcional que realiza alguna operacion o paso despues de un paso
   * critico en el algortimo
   */
  protected before() {}
  /**
   * metodo abstracto que obliga a las clases hijas a implementarlo para
   * realizar la operacion correspondiente en la lista de elementos
   */
  public abstract operacion(): number;
}
