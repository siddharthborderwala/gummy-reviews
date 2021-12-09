class AppError extends Error {
  static name = 'AppError';

  constructor(message, code) {
    super('Error on our part');
    this.type = 'AppError';
    this.code = code;
    this._message = message;
  }
}

module.exports = AppError;
