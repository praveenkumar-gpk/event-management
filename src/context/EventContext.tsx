import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

interface Event {
  id: string;
  name: string;
  dateTime: string;
  location: string;
  capacity: number;
  image:string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Event) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextType >({
  events: [],
  addEvent: () => {},
  updateEvent: () => {},
  deleteEvent: () => {}
});

export const useEventContext = () => useContext(EventContext);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Event[];
      setEvents(eventList);
    };
    fetchEvents();
    console.log(events)
  }, []);

  const addEvent = async (newEvent: Event) => {
    const eventCollection = collection(db, "events");
    const docRef = await addDoc(eventCollection, newEvent);
    setEvents(prevEvents => [...prevEvents, { ...newEvent, id: docRef.id }]);
  };

  const updateEvent = async (id: string, updatedEvent: Event) => {
    const eventDoc = doc(db, "events", id);
    await updateDoc(eventDoc, {
      name: updatedEvent.name,
      dateTime: updatedEvent.dateTime,
      location: updatedEvent.location,
      capacity: updatedEvent.capacity,
      image:updatedEvent.image,
    });
    setEvents(prevEvents => prevEvents.map(event => event.id === id ? updatedEvent : event));
  };

  const deleteEvent = async (id: string) => {
    const eventDoc = doc(db, "events", id);
    await deleteDoc(eventDoc);
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};
