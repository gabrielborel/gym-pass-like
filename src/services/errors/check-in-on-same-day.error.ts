export class CheckInOnSameDayError extends Error {
  constructor() {
    super('Check in already realized today.');
  }
}
