import UserInfo from "../database/model/user";

class userInfoManager {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {Object.array} The users info saved from the slack bot
   */
  static async getUsersInfo(req, res) {
    try {
      const result = await UserInfo.find();
      if (result.length === 0) {
        return res.status(404).json({
          message: "users information not found",
        });
      }
      res.status(200).json({
        message: "Users information retrieved successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

export default userInfoManager;
