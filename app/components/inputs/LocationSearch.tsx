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
            className="w-full border-2  border-slate-200 pl-2 py-1 pr-8 mb-2"
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
              opacity-50
              hover:opacity-60
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
          <div className="absolute top-[100%]  z-10 bg-primary-light left-2 right-2">
            {isLoading && <div className="p-2">Loading...</div>}
            {predictions.length === 0 && !isLoading && (
              <div className="p-2">No results found</div>
            )}
            {predictions.length > 0 &&
              !isLoading &&
              predictions.map((prediction) => (
                <button
                  key={prediction.id}
                  className="p-2 w-full text-left border-b border-slate-100 cursor-pointer hover:bg-slate-100"
                  onClick={() => selectLocation(prediction)}
                >
                  {prediction.name}
                </button>
              ))}
          </div>
        )}
      </div>
      <div className="h-[35vh]">
        <Map coordinates={coordinates} isZoomed={!!value.address} />
      </div>
    </div>
  );
};

export default LocationSearch;
