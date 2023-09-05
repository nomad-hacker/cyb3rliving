"use client";

import L, { LatLngExpression } from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { IoMdClose } from "react-icons/io";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useMap } from "../hooks/useMap";
import { PlaceDetails } from "../types";

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

const Map = ({ value, onChange, searchString, setSearchString }: Props) => {
  const {
    immediateValue,
    setImmediateValue,
    handleKeyDown,
    handleClearSearch,
    shouldShowPlaces,
    isLoading,
    predictions,
    selectLocation,
  } = useMap({ onChange, searchString, setSearchString });

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
