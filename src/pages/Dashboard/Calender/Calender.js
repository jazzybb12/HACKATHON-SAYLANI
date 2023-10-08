import React, { useState } from 'react';

export default function Calendar() {
  const [allEvents, setAllEvents] = useState([]);
  const [show, setShow] = useState(true);
  const [courseName, setCourseName] = useState(''); // Initialize state for courseName
  const [courseCode, setCourseCode] = useState(''); // Initialize state for courseCode
  const [description, setDescription] = useState(''); // Initialize state for description

  // Function to add a new event to the state
  const addEvent = () => {
    const newEvent = {
      courseName,
      courseCode,
      description,
    };
    setAllEvents((prevEvents) => [...prevEvents, newEvent]);
    // Clear the input fields after adding an event
    setCourseName('');
    setCourseCode('');
    setDescription('');
  };

  return (
    <>
      <div className="container">
        <div className="row">
          {/* Form to add a new event */}
          <form>
            <input
              type="text"
              placeholder="Course Name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Course Code"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="button" onClick={addEvent}>
              Add Event
            </button>
          </form>

          {/* Display the list of events */}
          <div>
            <h2>Events</h2>
            <ul>
              {allEvents.map((event, index) => (
                <li key={index}>
                  <strong>Course Name:</strong> {event.courseName}<br />
                  <strong>Course Code:</strong> {event.courseCode}<br />
                  <strong>Description:</strong> {event.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
