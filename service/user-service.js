const { User } = require("../models/user-model");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");
const { Token } = require("../models/token-model");

class UserService {
  
  async login(email) {
    
    const validateEmail = await mailService.validateEmailAddres(email);
    if (!validateEmail) {
      throw ApiError.BadRequest("Неккоректная почта");
    }
    const activationLink = await mailService.getRandomNumber();
    await User.create({ email, activationLink });
    await mailService.sendActivationMail(email, activationLink);
   
  }

  async activate(activationLink) {
    const user = await User.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw ApiError.BadRequest("Неккоректная ссылка активации");
    }
    user.isActivated = true;
    await user.save();
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const user_token = await Token.findOne({
      where: { refreshToken: refreshToken },
    });

    await User.destroy({
      where: { id: user_token.tokenuser },
    });
    const token = await tokenService.removeToken(refreshToken);
    return 'Logout выполнен';
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await User.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

module.exports = new UserService();
