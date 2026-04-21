'use client';
import {
  FacebookShareButton,
  XShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  XIcon,
  WhatsappIcon,
  EmailIcon,
} from 'react-share';

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex justify-center gap-3 pb-5">
        <FacebookShareButton
          url={shareUrl}
          aria-label="Share this page on Facebook"
          quote={property.name}
          hashtag={`#${property.type.replace(/\s/g, '')}ForRent`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <XShareButton
          title={property.name}
          url={shareUrl}
          hashtags={[`${property.type.replace(/\s/g, '')}ForRent`]}
          aria-label="Share on X"
        >
          <XIcon size={40} round={true} />
        </XShareButton>
        <WhatsappShareButton
          title={property.name}
          url={shareUrl}
          aria-label="Share on WhatsApp"
          separator="::"
        >
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={property.name}
          body={`Checkout this property listing: ${shareUrl}`}
          aria-label="Share by email"
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareButtons;
