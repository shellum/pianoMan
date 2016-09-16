test('test png randomization', () => {
  const utils = require('../src/components/common/utils');
  Array(10).fill().map(() => expect(utils.getSuffix('a')).toBe(0));
});
