import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

// Event interface
interface Event {
  id: string;
  name: string;
  dateTime: string;
  location: string;
  capacity: number;
  description:string
  image: string;
}

// Event context type
interface EventContextType {
  events: Event[];
  addEvent: (newEvent: Event) => Promise<any>;
  updateEvent: (id: string, updatedEvent: Event) => Promise<any>;
  deleteEvent: (id: string) => Promise<any>;
  isLoading:boolean;
}

const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: async () => {},
  updateEvent: async () => {},
  deleteEvent: async () => {},
  isLoading:true
});

// UseEventContext Hook
export const useEventContext = () => useContext(EventContext);

// EventProvider component using react-query
export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  // Fetch events using useQuery
  const { data: events = [], isLoading,isError,error } = useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: async () => {
      const eventCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventCollection);     
      return eventSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Event[];
    },
  });
  
  

  // Mutation for adding an event
  const addEventMutation = useMutation<void, Error, Event>({
    mutationFn: async (newEvent: Event) => {
      const eventCollection = collection(db, "events");
      await addDoc(eventCollection, newEvent);  // This function does not need to return anything
    },
    onSuccess: () => {
      // Correct way to invalidate queries
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
  
  // Mutation for updating an event
  const updateEventMutation = useMutation<void, Error, { id: string; updatedEvent: Event }>({
    mutationFn: async ({ id, updatedEvent }) => {
      const eventDoc = doc(db, "events", id);
      await updateDoc(eventDoc, {
        name: updatedEvent.name,
        dateTime: updatedEvent.dateTime,
        location: updatedEvent.location,
        capacity: updatedEvent.capacity,
        image: updatedEvent.image,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
  

  // Mutation for deleting an event
  const deleteEventMutation = useMutation<void,Error,string>({
    mutationFn:async (id)=>{
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  // Methods to expose via context
  const addEvent = async (newEvent: Event) => {
    addEventMutation.mutateAsync(newEvent);
  };

  const updateEvent = async (id: string, updatedEvent: Event) => {
    await updateEventMutation.mutateAsync({ id, updatedEvent });
  };

  const deleteEvent = async (id: string) => {
    deleteEventMutation.mutateAsync(id);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent,isLoading }}>
      {children}
    </EventContext.Provider>
  );
};
