export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in is too late to validate');
  }
}
