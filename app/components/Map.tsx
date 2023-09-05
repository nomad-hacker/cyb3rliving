"use client";

import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { IoMdClose } from "react-icons/io";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { getPlaceAutocomplete } from "../services/getPlaceAutocomplete";
import { getPlaceDetails } from "../services/getPlaceDetails";
import { set } from "date-fns";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

interface Props {
  value: PlaceDetails;
  onChange: (value: PlaceDetails) => void;
  searchString: string;
  setSearchString: (value: string) => void;
}

type Place = {
  name: string;
  id: string;
};

type PlaceDetails = {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

const Map = ({ value, onChange, searchString, setSearchString }: Props) => {
  const [immediateValue, setImmediateValue] = useState(searchString || "");
  const debouncedValue = useDebounce(immediateValue, 500);
  const [predictions, setPredictions] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowPlaces, setShouldShowPlaces] = useState(false);

  useEffect(() => {
    if (!debouncedValue) {
      setPredictions([]);
      setShouldShowPlaces(false);
      return;
    }

    setIsLoading(true);
    getPlaceAutocomplete(debouncedValue).then((predictions) => {
      setPredictions(predictions);
      setIsLoading(false);
    });
  }, [debouncedValue]);

  const selectLocation = async (place: Place) => {
    setImmediateValue(place.name);
    const placeDetails = await getPlaceDetails(place.id);
    onChange(placeDetails);
    setSearchString(place.name);
    setShouldShowPlaces(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setShouldShowPlaces(false);
    } else {
      setShouldShowPlaces(true);
    }
  };

  const handleClearSearch = () => {
    setImmediateValue("");
    onChange({
      address: "",
      coordinates: {
        lat: 51,
        lng: -0.09,
      },
    });
    setSearchString("");
  };

  const coordinates = Object.values(value.coordinates) as LatLngExpression;

  return (
    <div>
      <div className="relative">
        <div className="relative">
          <input
            className="w-full border-2 rounded-md border-slate-200 pl-2 py-1 pr-8 mb-2"
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
          <div className="absolute top-[100%] rounded-md z-10 bg-white left-2 right-2">
            {isLoading && <div className="p-2">Loading...</div>}
            {predictions.length === 0 && !isLoading && (
              <div className="p-2">No results found</div>
            )}
            {predictions.length > 0 &&
              !isLoading &&
              predictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className="p-2 border-b border-slate-100 cursor-pointer hover:bg-slate-100"
                  onClick={() => selectLocation(prediction)}
                >
                  {prediction.name}
                </div>
              ))}
          </div>
        )}
      </div>
      <MapContainer
        center={coordinates}
        zoom={value.address ? 12 : 2}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
      >
        <TileLayer url={url} attribution={attribution} />
        <Marker position={coordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
