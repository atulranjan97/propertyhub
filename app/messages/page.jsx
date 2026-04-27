import MessageCard from '@/components/MessageCard';
import connectDB from '@/config/database';
import Message from '@/models/MessageModel';
import '@/models/PropertyModel';
// we're doing that because we're going to be using the populate method where we populate the properties so we just have to have that there
import { convertToSerializableObject } from '@/utils/convertToObject';
import { getSessionUser } from '@/utils/getSessionUser';

const MessagesPage = async () => {
  await connectDB();

  const sessionUser = await getSessionUser();

  const { userId } = sessionUser;

  // we wanna find all the documents where the recipient is equal to the userId because the user checking the messages is the recipient
  const readMessages = await Message.find({
    recipient: userId,
    read: true,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'userName')
    .populate('property', 'name')
    .lean();

  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'userName')
    .populate('property', 'name')
    .lean();

    // create an array of messages that includes both the read and unread messages
    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
      const message = convertToSerializableObject(messageDoc);
      message.sender = convertToSerializableObject(message.sender);
      message.property = convertToSerializableObject(message.property);

      return message;
    });

    // console.log(messages);

    return (
      <section className="bg-teal-50">
        <div className="container m-auto py-24 max-w-6xl">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
            
            <div className="space-y-4">
              {messages.length === 0 ? (<p>You have no messages</p>) : (
                messages.map((message) => (
                  <MessageCard key={message._id} message={message} />
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    );
};

export default MessagesPage;
