class UserService {
  async create(user) {
    // 将user保存到数据库
    return `用户[${user.username}]注册成功！`
  }
}

module.exports = new UserService()