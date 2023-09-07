"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";

import { SafeUser } from "@/app/types";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Heading from "../Heading";
import HeartButton from "../HeartButton";
import { parseLocation } from "@/app/utils/scripts/parseLocation";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  images: string[];
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  locationValue,
  images,
  id,
  currentUser,
}) => {
  const parsedLocation = parseLocation(locationValue);
  const thumbnails = images.map((image) =>
    image.replace("upload", "upload/c_fill,w_160,h_90")
  );

  return (
    <>
      <Heading
        title={title}
        subtitle={`${parsedLocation.street}, ${parsedLocation.city}`}
      />
      <div
        className="
          w-full
          rounded-xl
          relative
        "
      >
        {images.length === 1 && (
          <Image
            src={images[0]}
            width={1200}
            height={570}
            className="aspect-video object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            alt="Photo of the property"
          />
        )}
        {images.length > 1 && (
          <Carousel
            renderThumbs={() => {
              return thumbnails.map((thumbnail) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={thumbnail} src={thumbnail} alt="" />
              ));
            }}
          >
            {images.map((image) => (
              <div key={image}>
                <Image
                  src={image}
                  width={1200}
                  height={570}
                  className="aspect-video object-cover"
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  alt="Photo of the property"
                />
              </div>
            ))}
          </Carousel>
        )}
        <div
          className="
            absolute
            top-5
            right-6
          "
        >
          <HeartButton size="large" listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
