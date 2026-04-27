import '@/components/Navbar';
import '@/assets/styles/global.css';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/ReactToastify.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
});

// console.log(poppins);

// we can add a title with a metadata object, and we can also add things like keyword and description meta tag
// you can do this in the layout as well as seperate pages. If we add a title here in the layout that's going to be the title for all pages, unless we go into the page specifically and a add a title
export const metadata = {
  title: 'Property Hub',
  keywords: 'rental, property, real estate',
  description: 'Find the perfect rental property',
};
// and since it rendered on server and not on the client like it would be with a SPA, search engines can crawl this and see the stuff easily
// that's how we can add metadata

// we can set favicon to the title bar just by naming it `favicon.ico` and putting in the `app` folder

// to get page/content that supposed to be displayed, it comes in as a prop to the layout so we wanna destructure that prop
const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html className={poppins.variable}>
          {/* <html> */}
          <body className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow">{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;

// we can directly access images from public folder without having to import them
// but import is necessary if accessing images from anywhere else
