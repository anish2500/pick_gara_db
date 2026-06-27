import User from '../models/User.js';

class BookmarkRepository {
    async getBookmarks(userId) {
        const user = await User.findById(userId).populate('bookmarks');
        return user ? user.bookmarks : [];
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
}

export default new BookmarkRepository();
