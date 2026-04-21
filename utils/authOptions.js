import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/UserModel';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // Optional: Force refresh token on every login
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful sign in
    async signIn({ profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not, then create user
      if (!userExists) {
        // Truncate username if too long
        const userName = profile.name.slice(0, 20);

        await User.create({
          email: profile.email,
          userName,
          image: profile.picture,
        })
      }
      // 4. Return true to allow sign in
      return true;
    },
    // Session callback function that modifies the session object (Add custom data to session)
    async session({ session }) {
      // 1. Get the user from database
      const user = await User.findOne({email: session.user.email});
      // 2. Assign user id from the session
      session.user.id = user._id.toString();
      // 3. Return session
      return session;
    },
  },
};

// authorization: {} this is going to make it so that when we try to log in, it doesn't automatically choose the last google account that you used, and we don't want that because we want to be able to test between our two different Google accounts that I added (as allowed accounts)
