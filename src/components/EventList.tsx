import React from "react";
import { useEventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";
import '../index.css'

const EventList = () => {
  
  const { events,loading } = useEventContext();
  const navigate = useNavigate();
  console.log (events.sort((a,b)=>{
    if (a.dateTime>b.dateTime) return 1;
    else if (a.dateTime<b.dateTime) return -1;
    return 0
  })
  )
  

  return loading?( <div className="relative text-center my-auto bg-cover bg-center min-h-screen bg-opacity-75 bg-custom-outer">Loading...</div>):(
    <div className="relative bg-cover bg-center min-h-screen bg-opacity-75 bg-custom-outer">      
      <div className="relative container mx-auto max-w-6xl p-8 bg-white bg-opacity-40 rounded-lg shadow-md animate-slideUp">
        <div className="mb-6 text-right">
          <button 
            onClick={() => navigate("/add")} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Add New Event
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event: { id: string; name: string; dateTime: string; location: string; }) => (
            <li 
              key={event.id} 
              className="bg-gray-50 shadow-sm rounded-lg p-6 border border-gray-200 bg-opacity-70 transition duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer animate-fadeInUp"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{event.name}</h3>
              <p className="text-gray-500 mb-2">
                <span className="font-medium">Date & Time:</span> {new Date(event.dateTime).toLocaleString()}
              </p>
              <p className="text-gray-500 mb-4">
                <span className="font-medium">Location:</span> {event.location}
              </p>
              <button 
                onClick={() => navigate(`/event/${event.id}`)} 
                className="text-blue-600 hover:underline font-medium transition duration-300"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventList;
