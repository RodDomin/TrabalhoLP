import path from 'path';
import { BrowserWindow } from 'electron';

import { Window } from '../Window';

class AddCar implements Window {
  private window: BrowserWindow

  constructor() {
    this.window = new BrowserWindow({
      width: 450,
      height: 550,
      icon: path.resolve(
        __dirname, '..', '..', 'public', 'icons', 'icons8-fiat-500-96.png',
      ),
      title: 'Adicionar carro',
    });

    this.window.loadFile(path.resolve(__dirname, 'index.html'));
  }

  public on(event: any, cb: (event: Event) => void): void {
    this.window.on(event, cb);
  }

  public events(): void {
    // this.window.on('item:add', (event: string, data: string[]) => {});
  }

  public destroy(): void {
    this.window.destroy();
  }
}

export default AddCar;
