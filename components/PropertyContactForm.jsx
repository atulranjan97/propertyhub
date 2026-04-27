'use client';
import { useEffect, useActionState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import addMessage from '@/app/actions/addMessage';
import SubmitMessageButton from './SubmitMessageButton';

const PropertyContactForm = ({ property }) => {
  const { data: session } = useSession();

  // const [state, formAction] = useActionState(actionMethod, initialState);
  const [state, formAction] = useActionState(addMessage, {});
  // whatever that action `addMessage` returns, it's gonna be put in the state
  // In our case, It returns either {submitted: true} or {error: 'You can not send a message to yourself'}
  // Jab user koi action trigger kare (jaise form submit), to aap easily uska result, loading state, aur errors manage kar sako — bina extra boilerplate ke. 

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.submitted) toast.success('Message sent successfully');
  }, [state]);

  if (state.submitted) {
    return <p className="text-green-600 mb-4 text-center">Your message has been sent</p>;
  }

  return (
    session && (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <form action={formAction}>
          {/* property and recipient are the hidden fields in this form */}
          {/* property input field(hidden) */}
          <input
            type="hidden"
            id="property"
            name="property"
            defaultValue={property._id}
          />
          {/* recipient input field(hidden) */}
          <input
            type="hidden"
            id="recipient"
            name="recipient"
            defaultValue={property.owner}
          />

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone:
            </label>
            <input
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="body"
            >
              Message:
            </label>
            <textarea
              className="shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
              id="body"
              name="body"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div>
            <SubmitMessageButton />
          </div>
        </form>
      </div>
    )
  );
};

export default PropertyContactForm;


/*
  Why did we make this a client component and not a server component?
    - A server component can submit a form, but it can’t react like this after submission without a full reload.

  Could this be a server component?
  If it were server-side:
    - No toast notifications
    - No useEffect
    - No useSession hook
    - No instant UI update after submit
  You’d have to:
    - Redirect after submission, or
    - Reload the page to show success/error
*/