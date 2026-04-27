'use server';
import connectDB from '@/config/database';
import Message from '@/models/MessageModel';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUnreadMessageCount() {
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id required');
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });


  return { count };
}

export default getUnreadMessageCount;
