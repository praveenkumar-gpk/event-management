import React from "react";
import { useEventContext } from "../context/EventContext";
import { useNavigate } from "react-router-dom";

const EventList: React.FC = () => {
  
  const { events } = useEventContext();
  const navigate = useNavigate();
  

  return (
    <div className="relative bg-cover bg-center min-h-screen bg-opacity-75" style={{ backgroundImage: `url('https://thumbs.6sqft.com/wp-content/uploads/2021/07/13123945/The-Rooftop-at-Pier-17-concert.jpg?w=2000&format=webp')` }}>      
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
          {events.map((event: { id: React.Key | null | undefined; name: React.ReactNode; dateTime: string | Date; location: React.ReactNode; }) => (
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
