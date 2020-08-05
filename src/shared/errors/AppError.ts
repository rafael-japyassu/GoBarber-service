class Error {
  public readonly message: string;

  public readonly statuesCode: number;

  constructor(message: string, statuesCode = 400) {
    this.message = message;
    this.statuesCode = statuesCode;
  }
}

export default Error;
