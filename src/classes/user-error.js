class UserError extends Error {
  static name = 'UserError';

  constructor(message, code) {
    super(message);
    this.type = 'UserError';
    this.code = code ?? 400;
  }
}

module.exports = UserError;
