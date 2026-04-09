import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';

// utility function to get the session(which has the user)
export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return null;
  }

  return {
    user: session.user,
    userId: session.user.id,
  };
};
// you could just return the user but for some cases where we just want the Id, I am just gonna return that too
