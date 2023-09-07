"use client";

import Image from "next/image";
import ImageUploading, { ImageType } from "react-images-uploading";
import { TbPhotoPlus } from "react-icons/tb";

import SwapIcon from "./assets/swap.svg";
import DeleteIcon from "./assets/delete.svg";
import LoadingIcon from "./assets/loading.svg";
import { useUploadImage } from "./hooks/useUploadImage";
import { PreviewImageWithUrl } from "@/app/types";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: PreviewImageWithUrl[]) => void;
  value: PreviewImageWithUrl[];
}

const MAX_IMAGE_NUMBER = 30;

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const { isUploading, previewImages, onImageFileChange } = useUploadImage({
    value,
    onChange,
  });

  const isImageUploaded = (image: ImageType) => {
    return image.dataURL?.startsWith("http");
  };

  return (
    <ImageUploading
      multiple
      value={previewImages}
      onChange={onImageFileChange}
      maxNumber={MAX_IMAGE_NUMBER}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => (
        <div className="upload__image-wrapper">
          <div
            style={isDragging ? { color: "red" } : undefined}
            onClick={isUploading ? () => {} : onImageUpload}
            {...dragProps}
            className={`relative
              transition
              border-dashed 
              border-2 
              p-10 
              border-primary
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
              ${
                isUploading
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:opacity-70"
              }`}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click or drop here</div>
          </div>
          {errors && (
            <div className="flex flex-col gap-2 mt-2">
              {errors.maxNumber && (
                <span className="text-sm text-red-500">
                  Cannot upload more than {MAX_IMAGE_NUMBER} images
                </span>
              )}
            </div>
          )}
          <div className="flex gap-2 overflow-y-auto mt-4 mb-[-1.5rem]">
            {imageList.map((image, index) => (
              <div key={index}>
                <div className="relative w-24 h-[4.5rem] flex justify-center items-center h-100">
                  <Image
                    className={`object-contain ${
                      isImageUploaded(image) ? "" : "opacity-50"
                    }`}
                    src={image.dataURL!}
                    alt={image.file ? image.file.name : "Uploaded image"}
                    fill
                    sizes="150"
                  />
                  {isImageUploaded(image) ? null : (
                    <div className="animate-spin">
                      <Image src={LoadingIcon} alt="" width="28" height="28" />
                    </div>
                  )}
                </div>
                <div className="m-2 flex justify-between">
                  <button
                    className="disabled:opacity-50"
                    disabled={isUploading}
                    onClick={() => onImageUpdate(index)}
                  >
                    <Image src={SwapIcon} alt="" width="28" height="28" />
                  </button>
                  <button
                    className="disabled:opacity-50"
                    disabled={isUploading}
                    onClick={() => onImageRemove(index)}
                  >
                    <Image src={DeleteIcon} alt="" width="28" height="28" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
};

export default ImageUpload;
