import User from '../models/User.js';
class UserRepository {
  async create(userData) {
    return await User.create(userData);
  }
  async findByEmail(email) {
    return await User.findOne({ email });
  }
 
  async findById(id) {
    return await User.findById(id);
  }

  async updateById(id, updateData){
    return await User.findByIdAndUpdate(
      id,
      updateData,
      { returnDocument: 'after'}
    );
  }

  async addBookmark(userId, placeId) {
    return await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarks: placeId } },
      { returnDocument: 'after' }
    ).populate('bookmarks');
  }

  async removeBookmark(userId, placeId) {
    return await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: placeId } },
      { returnDocument: 'after' }
    ).populate('bookmarks');
  }

  async getBookmarks(userId) {
    const user = await User.findById(userId).populate('bookmarks');
    return user ? user.bookmarks : [];
  }
}
export default new UserRepository();