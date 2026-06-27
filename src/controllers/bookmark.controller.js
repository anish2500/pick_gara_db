import bookmarkRepository from '../repositories/bookmark.repository.js';

export const toggleBookmark = async (req, res) => {
    try {
        const { placeId } = req.params;
        const userId = req.userId;

        const bookmarks = await bookmarkRepository.getBookmarks(userId);
        const isBookmarked = bookmarks.some((p) => p._id.toString() === placeId);

        let updatedUser;
        if (isBookmarked) {
            updatedUser = await bookmarkRepository.removeBookmark(userId, placeId);
        } else {
            updatedUser = await bookmarkRepository.addBookmark(userId, placeId);
        }

        res.json({
            message: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
            isBookmarked: !isBookmarked,
            bookmarks: updatedUser.bookmarks,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await bookmarkRepository.getBookmarks(req.userId);
        res.json({ bookmarks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
