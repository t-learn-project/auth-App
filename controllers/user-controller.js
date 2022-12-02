const userService = require("../service/user-service");

class UserController {
  async login(req, res, next) {
    try {
      const { email } = req.body;
      await userService.login(email);
      return res.send('успешно');

    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const { activationLink } = req.body;
      const activateUser = await userService.activate(activationLink);
      return res.json(activateUser);
    } catch (e) {
      next(e);
    }
  }

  // рефреш токен получаю с клиента
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const token = await userService.logout(refreshToken);
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }


  // рефреш токен получаю с клиента
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const userData = await userService.refresh(refreshToken);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
