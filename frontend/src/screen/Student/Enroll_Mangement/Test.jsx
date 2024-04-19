import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Test.css';

function Test() {
  return (
    <div>
      <div className="buttontest">
        <h2>Sinhala</h2>
        <Link to="/viewclass"><button className="button">View Class</button></Link> {/* Link to Sinhala class */}
        <Link to="/"><button className="button">View Schedule</button></Link> {/* Link to Sinhala schedule */}
        <br/><br/>
        <h2>Maths</h2>
        <Link to="/"><button className="button">View Class</button></Link> {/* Link to Maths class */}
        <Link to="/"><button className="button">View Schedule</button></Link> {/* Link to Maths schedule */}
        <br/><br/>
        <h2>ICT</h2>
        <Link to="/"><button className="button">View Class</button></Link> {/* Link to ICT class */}
        <Link to="/"><button className="button">View Schedule</button></Link> {/* Link to ICT schedule */}
        <br/><br/>
        <h2>English</h2>
        <Link to="/"><button className="button">View Class</button></Link> {/* Link to English class */}
        <Link to="/"><button className="button">View Schedule</button></Link> {/* Link to English schedule */}
      </div>
      <div>
        <Link to="/enrolled"><button className="button">Enrolled Class</button></Link> {/* Link to enrolled classes */}
      </div>
    </div>
  );
}

export default Test;
