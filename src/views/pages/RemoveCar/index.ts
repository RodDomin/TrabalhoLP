import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';

import { Window } from '../Window';
import { Events } from './types';
import FilesLoc from '../../../Files';

class RemoveCar implements Window {
  window: BrowserWindow;

  constructor() {
    this.window = new BrowserWindow({
      width: 450,
      height: 550,
      icon: path.resolve(
        __dirname, '..', '..', 'public', 'icons', 'icons8-fiat-500-96.png',
      ),
      title: 'Remover carro',
    });

    this.window.loadFile(
      path.resolve(
        __dirname, 'index.html',
      ),
    );

    this.events();
  }

  destroy(): void {
    this.window.destroy();
  }

  events(): void {
    ipcMain.on(Events.CREATE, async (data: string[]) => {
      await FilesLoc.escreveArq(data);

      this.window.webContents.send(Events.CREATE, data);
    });
  }

  on(event: any, cb: () => void): void {
    this.window.on(event, cb);
  }
}

export default RemoveCar;
