class UserService {
  constructor(database) {
    this.database = database;
  }
  async getUserById(id) {
    const user = await this.database.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default UserService;