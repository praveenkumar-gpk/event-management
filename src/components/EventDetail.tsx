import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventContext";
import '../index.css'


const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { events, deleteEvent } = useEventContext();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === id);
  const htmlToText = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || "";
  };
  

  if (!event) return <div>Event not found</div>;
  

  return (
    <div className="relative bg-cover flex bg-center min-h-screen bg-opacity-75 bg-custom-details"> 
      <div className="absolute inset-0 bg-black bg-opacity-40 animate-fadeIn"></div>

      <div className="container m-auto relative max-w-lg p-8 bg-white bg-opacity-90 shadow-lg rounded-lg border border-gray-200 opacity-90 animate-slideUpSlow z-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 animate-fadeIn">{event.name}</h2>

        <p className="text-gray-600 mb-2 animate-fadeInDelay">
          <span className="font-medium">Date & Time:</span> {new Date(event.dateTime).toLocaleString()}
        </p>
        {event.description &&
          <div className="text-gray-600 "><span className="font-medium">Description:</span> {htmlToText(event.description)}</div>}
        <p className="text-gray-600 mb-2 animate-fadeInDelay">
          <span className="font-medium">Location:</span> {event.location}
        </p>

        {event.image && (
          <div className=" z-1">
            <img
              src={event.image}
              alt=""
              className="mb-4 rounded-lg shadow-md animate-fadeInDelay hover:scale-150 transition-transform duration-500 ease-in-out z-0"
            />
          </div>
        )}

        <p className="text-gray-600 mb-6 animate-fadeInDelay">
          <span className="font-medium">Capacity:</span> {event.capacity}
        </p>

        <div className="flex space-x-4 animate-fadeInDelay z-10">
          <button
            onClick={() => { deleteEvent(event.id); navigate('/'); }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            Delete Event
          </button>

          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            Back
          </button>

          <button
            onClick={() => navigate(`/update/${id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 transform hover:scale-105"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
