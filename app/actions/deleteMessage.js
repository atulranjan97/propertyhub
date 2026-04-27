'use server';
import connectDB from '@/config/database';
import Message from '@/models/MessageModel';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteMessage(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User Id required');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message Not Found');
  }

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }


  await message.deleteOne();
  // here `deleteOne` method is called on the `message` that we fetch, so it already knows which one we're dealing with

  revalidatePath('/messages', 'page');

}

export default deleteMessage;
