"use client";

import { IoMdClose } from "react-icons/io";

import "leaflet/dist/leaflet.css";
import { PlaceDetails } from "@/app/types";
import { useLocationSearch } from "@/app/hooks/useLocationSearch";
import { useMemo } from "react";
import dynamic from "next/dynamic";

interface Props {
  value: PlaceDetails;
  onChange: (value: PlaceDetails) => void;
  searchString: string;
  setSearchString: (value: string) => void;
}

const LocationSearch = ({
  value,
  onChange,
  searchString,
  setSearchString,
}: Props) => {
  const {
    immediateValue,
    setImmediateValue,
    handleKeyDown,
    handleClearSearch,
    shouldShowPlaces,
    isLoading,
    predictions,
    selectLocation,
  } = useLocationSearch({ onChange, searchString, setSearchString });

  const coordinates = Object.values(value.coordinates) as [number, number];

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [value.coordinates]
  );

  return (
    <div>
      <div className="relativ1e">
        <div className="relative">
          <input
            className="w-full outline-black outline-offset-4 bg-transparent border-b-2 pl-2 py-1 pr-8 mb-2"
            type="text"
            placeholder="Search location"
            value={immediateValue}
            onChange={(e) => setImmediateValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="
              p-2
              border-0 
              hover:opacity-80
              transition
              absolute
              right-[1px]
            "
            onClick={handleClearSearch}
          >
            <IoMdClose size={18} />
          </button>
        </div>
        {shouldShowPlaces && (
          <div className="absolute border-[1px] border-t-0 z-10 bg-primary-light left-6 right-6">
            {isLoading && <div className="p-2">Loading...</div>}
            {predictions.length === 0 && !isLoading && (
              <div className="p-2">No results found</div>
            )}
            {predictions.length > 0 &&
              !isLoading &&
              predictions.map((prediction) => (
                <button
                  key={prediction.id}
                  className="p-2 w-full text-left border-b border-slate-100 cursor-pointer hover:brightness-50"
                  onClick={() => selectLocation(prediction)}
                >
                  {prediction.name}
                </button>
              ))}
          </div>
        )}
      </div>
      <div className="mt-4 h-[35vh]">
        <Map coordinates={coordinates} isZoomed={!!value.address} />
      </div>
    </div>
  );
};

export default LocationSearch;
