import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

export default {
  async escreveArq(data: string[]): Promise<void> {
    const json = {
      Code: data[0],
      Name: data[1],
      Manufacturer: data[2],
      Year: data[3],
      BuyPrice: data[4],
      SalePrice: data[5],
    };
    const jsonData = JSON.stringify(json);

    const writeFile = promisify(fs.writeFile);

    try {
      await writeFile(
        path.resolve(__dirname, '..', 'Data', `${data[0]}.json`),
        jsonData,
      );
    } catch (err) {
      console.log(err);
    }
  },

  removeArq: () => {
  },
};
