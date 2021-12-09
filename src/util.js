const { nanoid } = require('nanoid');
const { ID_SIZE } = require('./constants');

exports.generateId = function* () {
  yield nanoid(ID_SIZE);
};
