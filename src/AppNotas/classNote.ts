import {Colour} from './classColor';

/**
 * clase que representa una nota
 */
export class Note {
  /**
   * el contructor recibe el titulo, cuerpo y color con los que se construye una nota
   * @param title string
   * @param body string
   * @param colour Colour
   */
  constructor(private title: string, private body: string, private colour: Colour) {
  }

  /**
   * devuelve el titulo de la nota
   * @returns string
   */
  public getTitle(): string {
    return this.title;
  }
  /**
   * devuelve el cuerpo de la nota
   * @returns string
   */
  public getBody(): string {
    return this.body;
  }
  /**
   * devuelve el color de la nota
   * @returns colur
   */
  public getColour(): Colour {
    return this.colour;
  }
  /**
   * modifica el titulo de la nota
   * @param newTitle string
   */
  public setTitle(newTitle: string): void {
    this.title = newTitle;
  }
  /**
   * modifica el cuerpo de la nota
   * @param newBody string
   */
  public setBody(newBody: string): void {
    this.body = newBody;
  }
  /**
   * modifica el color de la nota
   * @param newColour Colour
   */
  public setColour(newColour: Colour): void {
    this.colour = newColour;
  }
  /**
   * muestar por la consola la informacion de la nota
   * @returns string
   */
  public showInfo(): string {
    const info: string = `-Titulo: ${this.title}\n-Cuerpo: ${this.body}\n-Color: ${this.colour.getColour()}`;
    console.log(info);
    return info;
  }
}
