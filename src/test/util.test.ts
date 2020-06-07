import assert from 'assert';

import { getFilter } from '../util';

suite('util functions', function () {
  this.timeout(120000);

  suite('getFilter()', () => {
    const commands = [
      '/foo/bar/node_modules/electron/dist/Electron.app/Contents/MacOS/Electron',
      '/foo/bar/app.js',
    ];

    test('filter should always return true if configuration is not defined', () => {
      const filter = getFilter();
      assert(filter(commands[0]) === true);
      assert(filter(commands[1]) === true);
    });

    test('filter should always return true if configuration is defined as empty array', () => {
      const filter = getFilter([]);
      assert(filter(commands[0]) === true);
      assert(filter(commands[1]) === true);
    });

    test('filter should correctly do matching if configuration is defined valid', () => {
      const filter = getFilter([
        '**/node_modules/electron/**/*'
      ]);
      assert(filter(commands[0]) === true);
      assert(filter(commands[1]) === false);
    });
  });
});
