import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useEventContext } from "../context/EventContext";
import { useNavigate, useParams } from "react-router-dom";
import { Event } from "../types/type";
import { Editor } from "@tinymce/tinymce-react";

interface FormInputs {
  name: string;
  dateTime: string;
  location: string;
  capacity: number;
  image: string;
}

const EventForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormInputs>();
  const { addEvent, updateEvent, events,loading,setLoading } = useEventContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    function setFormvalues(event:Event){
        setValue("name", event.name);
        setValue("dateTime", event.dateTime);
        setValue("location", event.location);
        setValue("capacity", event.capacity);
        setValue("image", event.image);
    }
    if (id) {
      const event = events.find((event: { id: string; }) => event.id === id);
      if (event) {
        setFormvalues(event);
      }
    }
    setLoading(false);
  });

  const onSubmit = (data: FormInputs) => {
    if (id) {
      updateEvent(id, { ...data, id });
    } else {
      addEvent({ ...data, id: "" });
    }
    console.log(data)
    navigate("/");
  };

  return (
    <div className="relative flex bg-cover bg-center min-h-screen bg-opacity-75" style={{ backgroundImage: `url('https://thumbs.6sqft.com/wp-content/uploads/2021/07/13123945/The-Rooftop-at-Pier-17-concert.jpg?w=2000&format=webp')` }}>
      {loading?<div>Loading...</div>:<form data-testid="form-id" onSubmit={handleSubmit(onSubmit)} className="max-w-lg w-full m-auto p-8 bg-white opacity-90 shadow-md rounded-lg border border-gray-200 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <input
            {...register("name", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter event name"
          />
          {errors.name && <span className="text-red-500 text-sm">Event name is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
          <input
            data-testid="date-id"
            type="datetime-local"
            {...register("dateTime", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.dateTime && <span className="text-red-500 text-sm">Date & Time is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            {...register("location", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter event location"
          />
          {errors.location && <span className="text-red-500 text-sm">Location is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            {...register("image", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add Image URL"
          />
          {errors.image && <span className="text-red-500 text-sm">URL is required</span>}
        </div>
        

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
          <input
            type="number"
            {...register("capacity", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter event capacity"
          />
          {errors.capacity && <span className="text-red-500 text-sm">Capacity is required</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 focus:ring-2 focus:ring-blue-500"
        >
          {id ? "Update Event" : "Add Event"}
        </button>

      </form>}
    </div>
  );
};

export default EventForm;
