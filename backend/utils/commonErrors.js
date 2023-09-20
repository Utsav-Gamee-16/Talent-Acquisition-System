class CommonErrors {
  constructor(errorCode, overrideMessage) {
    Object.assign(this, {
      400: "Bad request",
      401: "Unauthorized request",
      403: "Request was forbidden",
      404: "Requested resource not found",
      409: "Resource is already taken",
      500: "An error occurred. Unable to fulfil request",
      501: "Not Implemented",
      default: "An unknown error occurred",
    });
    return {
      code: errorCode,
      message: overrideMessage || (this[errorCode]
        ? this[errorCode] : this.default),
    };
  }
}

module.exports = CommonErrors;
