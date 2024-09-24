import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import {Event} from "../types/type"


interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Event) => void;
  deleteEvent: (id: string) => void;
  loading:boolean;
  setLoading:React.Dispatch<React.SetStateAction<boolean>>;
}

const EventContext = createContext<EventContextType >({
  events: [],
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {},
  loading:false,
  setLoading:()=>{}
});

export const useEventContext = () => useContext(EventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading,setLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([]);
  const eventCollection = collection(db, "events");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try{
        const eventSnapshot = await getDocs(eventCollection);
        const eventList = eventSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Event[];
        setEvents(eventList);
        setLoading(false);
      }catch(error){
        console.log(error);
      }    
    };
    fetchEvents();
    
    
    
    
  }, []);

  const addEvent = async (newEvent: Event) => {
    setLoading(true);
    try{
      const docRef = await addDoc(eventCollection, newEvent);
      setEvents(prevEvents => [...prevEvents, { ...newEvent, id: docRef.id }]);
      setLoading(false);
    }
    catch(error){
      console.log(error)
    }
    
  };

  const updateEvent = async (id: string, updatedEvent: Event) => {
    setLoading(true)
    try{
      const eventDoc = doc(db, "events", id);
    await updateDoc(eventDoc, {
      name: updatedEvent.name,
      dateTime: updatedEvent.dateTime,
      location: updatedEvent.location,
      capacity: updatedEvent.capacity,
      image:updatedEvent.image,
      description:updatedEvent.description
    });
    setEvents(prevEvents => prevEvents.map(event => event.id === id ? updatedEvent : event));
    setLoading(false)
    }
    catch(error){
      console.log(error)
    } 
  };

  const deleteEvent = async (id: string) => {
    setLoading(true)
    try{
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
      setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
      setLoading(false)
    }
    catch(error){
      console.log(error)
    }
    
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent,loading,setLoading }}>
      {children}
    </EventContext.Provider>
  );
};
