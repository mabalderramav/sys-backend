export class BadRequestExceptions extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
