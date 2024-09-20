import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./components/EventList";
import EventDetail from "./components/EventDetail";
import AddEventForm from "./components/EventForm";
import { EventProvider } from "./context/EventContext";

function App() {
  return (
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
  );
}

export default App;
