'use server';
import connectDB from '@/config/database';
import User from '@/models/UserModel';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id required');
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  const isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
