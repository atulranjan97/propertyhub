'use server';
import connectDB from '@/config/database';
import Message from '@/models/MessageModel';
import { getSessionUser } from '@/utils/getSessionUser';

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }
  // Now, when we throw an error the way we're doing this here, it's actually going to show a page called `error.jsx` which we haven't created(at this point of time, 7 april), so `next.js` allows you to just use that name convention and have an error page. We'll make it so it shows this message on the screen

  const { userId } = sessionUser;

  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { error: 'You can not send a message to yourself' };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  });

  await newMessage.save();

  return { submitted: true };
}

export default addMessage;
