class UserError extends Error {
  static name = 'UserError';

  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
