import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import AddEventForm from "./components/EventForm";
import { EventProvider } from "./context/EventContext";

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EventProvider>
        <Router>
          <Routes>
            <Route path="/" element={<EventList />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/add" element={<AddEventForm />} />
            <Route path="/update/:id" element={<AddEventForm />} />
          </Routes>
        </Router>
      </EventProvider>
    </QueryClientProvider>
  );
}

export default App;

