import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CloudinaryImage from "../components/CloudinaryImage";
import api from "../utils/api";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  
  useEffect(() => {
    // Using our API utility instead of direct axios import
    api.get("/home").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-14">
      {places.length > 0 &&
        places.map((place) => (
          <Link key={place.id} to={"/place/" + place.id}>
            <div className="rounded-2xl aspect-square mt-3">
              {place.photos?.length > 0 && (
                <CloudinaryImage
                  photo={place.photos[0]}
                  alt={place.title}
                  className="rounded-2xl object-cover aspect-square"
                />
              )}
            </div>
            <div className="mt-2">
              <h2 className="font-bold truncate">{place.address}</h2>
              <h3 className="text-gray-500 truncate">{place.title}</h3>
              {place.startDate && place.endDate && (
                <p className="text-gray-500">
                  {new Date(place.startDate).getDate()} {months[new Date(place.startDate).getMonth()]}
                  {" - "}{new Date(place.endDate).getDate()} {months[new Date(place.endDate).getMonth()]}
                </p>
              )}
              <p className="underline mt-1"><span className="font-bold">£{place.price}</span> total</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
