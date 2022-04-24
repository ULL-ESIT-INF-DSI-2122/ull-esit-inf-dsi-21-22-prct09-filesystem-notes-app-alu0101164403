// export type Colour = 'rojo' | 'verde' | 'azul' | 'amarillo';

import chalk from 'chalk';

/**
 * clase que representa un color valido para las notas
 */
export class Colour {
  private colour: string;
  /**
   * se recibe en el contructor el nombre del color
   * @param color string
   */
  constructor(color: string) {
    if (color === 'red' || color === 'green' || color === 'blue' || color === 'yellow') {
      this.colour = color;
    } else {
      throw Error(chalk.red('El color no es correcto.'));
    }
  }
  /**
   * se devuelve el nombre del color
   * @returns string
   */
  public getColour(): string {
    return this.colour;
  }
}
