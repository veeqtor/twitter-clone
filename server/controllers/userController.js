import { Users } from '../models';
import encryptions from '../helpers/encryptions';
import errors from '../helpers/errors';

class UserController {
  /**
   * Register users function
   * @param {*} req
   * @param {*} res
   * returns the registered user object
   */
  static registerUsers(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    Users.findOrCreate({
      where: { email },
      defaults: {
        first_name: firstName,
        last_name: lastName,
        password: encryptions.encrypt(password),
      },
    }).spread((user, created) => { // Necessary to find out if the user was created or not
      if (created) {
        const payload = user.get({ plain: true });
        delete payload.password;
        const token = encryptions.tokenize(payload, process.env.SECRET, '1h');
        res.status(200).json({
          status: 'Success',
          data: {
            message: `Hi, ${user.first_name}, Your registration was successfully`,
            token,
          },
        });
      } else {
        errors.error409(res, email);
      }
    });
  }

  /**
  * Login function
  * @param {*} req
  * @param {*} res
  * returns logged in users object
  */
  static signIn(req, res) {
    const { email, password } = req.body;
    Users.findOne({ where: { email } }).then((user) => {
      if (user && encryptions.compare(password, user.dataValues.password)) {
        const payload = user.dataValues;
        delete payload.password;
        const token = encryptions.tokenize(payload, process.env.SECRET, '1h');
        res.status(200).json({
          status: 'success',
          data: {
            message: `Hi, ${payload.first_name}, You have successfully logged in`,
            token,
          },
        });
      } else {
        errors.error401(res);
      }
    });
  }
}
export default UserController;
