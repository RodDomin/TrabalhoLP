import {
  app,
  ipcMain,
} from 'electron';
import path from 'path';
import { promisify } from 'util';
import fs from 'fs';

import FilesLoc from './Files';

import {
  MainScreen, AddCar, Window, RemoveCar,
} from './views/pages';

ipcMain.on('page:remove', async (event: any, data: string) => {
  const unlink = promisify(fs.unlink);
  const filePath = path.resolve(
    __dirname, '..', 'Data', `${data}.json`,
  );

  try {
    await unlink(filePath);
  } catch (err) {
    console.log(err);
  }
});

ipcMain.on('softStartup', async (event: any) => {
  const readdir = promisify(fs.readdir);

  try {
    const files = await readdir(
      path.resolve(__dirname, '..', 'Data'),
    );

    const MiddleContent: string[] = [];

    const readFile = promisify(fs.readFile);

    files.forEach(async (file) => {
      const filePath = path.resolve(__dirname, '..', 'Data', file);

      const fileData = await readFile(filePath, 'utf8');

      const content = JSON.parse(fileData);

      MiddleContent[0] = content.Code;
      MiddleContent[1] = content.Name;
      MiddleContent[2] = content.Manufacturer;
      MiddleContent[3] = content.Year;
      MiddleContent[4] = content.BuyPrice;
      MiddleContent[5] = content.SalePrice;

      event.sender.send('item:add', MiddleContent);
    });
  } catch (err) {
    console.log(err);
  }
});

ipcMain.on('page:new', (event: any, data: string) => {
  let page: Window;

  if (data === 'remove') {
    page = new RemoveCar();
  } else {
    page = new AddCar();
  }

  page.on('close', () => {
    page.destroy();
  });
});

app.on('ready', () => new MainScreen());
