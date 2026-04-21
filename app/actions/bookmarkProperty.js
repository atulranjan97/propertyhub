'use server';
import connectDB from '@/config/database';
import User from '@/models/UserModel';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id required');
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);

  let isBookmarked = user.bookmarks.includes(propertyId);

  let message;

  if (isBookmarked) {
    // If already bookmarked, then remove
    user.bookmarks.pull(propertyId);
    // `pull()` here is a Mongoose array method, internally behaves like a mongoDB's `$pull` operator, removes matching value(s) from the array

    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    // If not bookmarked, then add
    user.bookmarks.push(propertyId);
    // `push()` here is a normal JS array method, Adds value to the array

    message = 'Bookmark Added';
    isBookmarked = true;
  }

  await user.save();
  revalidatePath('/properties/saved', 'page');

  return {
    message,
    isBookmarked,
  };
}

export default bookmarkProperty;
