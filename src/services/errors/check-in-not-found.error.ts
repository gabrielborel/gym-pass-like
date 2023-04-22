export class CheckInNotFoundError extends Error {
  constructor() {
    super('CheckIn not found.');
  }
}
