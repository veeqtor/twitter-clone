class errors {
  /**
   * Error 401: Unauthorized
   * @param {*} res
   */
  static error401(res) {
    res.status(401).json({
      status: 'error',
      data: {
        message: 'Authentication failed',
      },
    });
  }

  /**
   * Error 409: Conflict
   * @param {*} res
   * @param {*} attr
   */
  static error409(res, attr) {
    res.status(409).json({
      status: 'error',
      data: {
        message: `Oops!, '${attr}' already exists`,
      },
    });
  }
}


export default errors;
