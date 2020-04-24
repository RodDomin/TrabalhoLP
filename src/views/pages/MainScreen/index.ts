import { BrowserWindow, Event } from 'electron';
import path from 'path';

import { Window } from '../Window';

class MainScreen implements Window {
  private window: BrowserWindow

  constructor() {
    this.window = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.resolve(
        __dirname, '..', '..', 'public', 'icons', 'icons8-fiat-500-96.png',
      ),
      title: 'Pagina inicial',
    });

    this.window.loadFile(
      path.resolve(
        __dirname, 'index.html',
      ),
    );
  }

  public events(): void {
    //
  }

  public on(event: any, cb: (event: Event) => void): void {
    this.window.on(event, cb);
  }

  public destroy(): void {
    this.window.close();
  }
}

export default MainScreen;
