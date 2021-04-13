class UserService {
  async create() {
    // 将user保存到数据库
    return "用户创建成功"
  }
}

module.exports = new UserService()