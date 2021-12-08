class AppError extends Error {
  static name = 'AppError';

  constructor(message, code) {
    super('Error on our part');
    this.code = code;
    this._message = message;
  }
}
