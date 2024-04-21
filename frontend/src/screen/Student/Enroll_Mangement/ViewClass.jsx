// ViewClass.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function ViewClass() {
  const { subjectName } = useParams(); // Retrieve the subjectName parameter from the URL

  return (
    <div>
      <h2>PayNow</h2>
      <Link to="/viewonline">
        <button className="button">PayNow</button>
      </Link>
      <h3>Subject Name: {subjectName}</h3> {/* Display the subject name */}
    </div>
  );
}

export default ViewClass;
