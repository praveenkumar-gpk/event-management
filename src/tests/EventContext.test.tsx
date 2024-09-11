import { vi } from 'vitest';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { EventProvider, useEventContext } from '../context/EventContext';
import { db } from '../firebase';

// Mock Firestore functions
vi.mock('../firebase', () => ({
  collection: vi.fn(),
  getDocs: vi.fn(),
  addDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  doc: vi.fn(),
}));

// Sample event data
const mockEvent = {
  id: '1',
  name: 'Event 1',
  dateTime: '2024-12-01T10:00',
  location: 'New York',
  capacity: 100,
  image: 'image.jpg',
};

describe('EventProvider CRUD operations', () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Reset mock calls between tests
  });

  it('should fetch and set events on initial load', async () => {
    // Mock Firestore's getDocs to return a promise resolving to an array of events
    (getDocs as vi.Mock).mockResolvedValue({
      docs: [
        { id: '1', data: () => mockEvent },
      ],
    });

    const TestComponent = () => {
      const { events } = useEventContext();
      return <div>{events.length > 0 && <span>{events[0].name}</span>}</div>;
    };

    const { getByText } = render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    await waitFor(() => {
      expect(getByText('Event 1')).toBeInTheDocument(); // Assert event is rendered
    });
    expect(getDocs).toHaveBeenCalledTimes(1); // Assert getDocs was called once
  });

  it('should add a new event', async () => {
    const newEvent = { ...mockEvent, id: '2', name: 'Event 2' };
    (addDoc as vi.Mock).mockResolvedValue({ id: '2' });

    const TestComponent = () => {
      const { addEvent, events } = useEventContext();
      return (
        <div>
          <button onClick={() => addEvent(newEvent)}>Add Event</button>
          {events.length > 1 && <span>{events[1].name}</span>}
        </div>
      );
    };

    const { getByText, getByRole } = render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    // Simulate adding event
    getByRole('button').click();

    await waitFor(() => {
      expect(getByText('Event 2')).toBeInTheDocument(); // Assert new event is added
    });
    expect(addDoc).toHaveBeenCalledWith(collection(db, 'events'), newEvent); // Assert Firestore addDoc called
  });

  it('should update an event', async () => {
    const updatedEvent = { ...mockEvent, name: 'Updated Event 1' };
    (updateDoc as vi.Mock).mockResolvedValue({});

    const TestComponent = () => {
      const { updateEvent, events } = useEventContext();
      return (
        <div>
          <button onClick={() => updateEvent(mockEvent.id, updatedEvent)}>Update Event</button>
          <span>{events[0].name}</span>
        </div>
      );
    };

    const { getByText, getByRole } = render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    // Simulate updating event
    getByRole('button').click();

    await waitFor(() => {
      expect(getByText('Updated Event 1')).toBeInTheDocument(); // Assert updated event is shown
    });
    expect(updateDoc).toHaveBeenCalledWith(doc(db, 'events', mockEvent.id), {
      name: updatedEvent.name,
      dateTime: updatedEvent.dateTime,
      location: updatedEvent.location,
      capacity: updatedEvent.capacity,
      image: updatedEvent.image,
    });
  });

  it('should delete an event', async () => {
    (deleteDoc as vi.Mock).mockResolvedValue({});

    const TestComponent = () => {
      const { deleteEvent, events } = useEventContext();
      return (
        <div>
          <button onClick={() => deleteEvent(mockEvent.id)}>Delete Event</button>
          <span>{events.length === 0 ? 'No Events' : events[0].name}</span>
        </div>
      );
    };

    const { getByText, getByRole } = render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    // Simulate deleting event
    getByRole('button').click();

    await waitFor(() => {
      expect(getByText('No Events')).toBeInTheDocument(); // Assert event is deleted
    });
    expect(deleteDoc).toHaveBeenCalledWith(doc(db, 'events', mockEvent.id));
  });
});
