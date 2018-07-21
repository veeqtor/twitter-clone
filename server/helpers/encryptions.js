import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Encryptions {
  /**
  * Encrypts user password
  * @param {*} password
  * @return {hash}
  */
  static encrypt(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
  * Compares the hashed password
  * @param {*} hashedPassword
  * @param {*} password
  * @returns {true || false}
  */
  static compare(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * Generates a token
   * @param {*} payload
   * @param {*} secretKey
   * @param {*} expires
   */
  static tokenize(payload, secretKey, expires) {
    return jwt.sign(payload, secretKey, { expiresIn: expires });
  }

  /**
   * Verifies token
   * @param {*} token
   * @param {*} secretKey
   */
  static verifyToken(token, secretKey) {
    return jwt.verify(token, secretKey);
  }
}

export default Encryptions;
