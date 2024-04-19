import React from 'react';
import './Test.css';

function Test() {
  return (
    <div>
    <div className="buttontest">
      <h2>Sinhala</h2>
      <button className="button">View Class</button>
      <button className="button">View schedule</button>
      <br/><br/>
      <h2>Maths</h2>
      <button className="button">View Class</button>
      <button className="button">View schedule</button>
      <br/><br/>
      <h2>ICT</h2>
      <button className="button">View Class</button>
      <button className="button">View schedule</button>
      <br/><br/>
      <h2>English</h2>
      <button className="button">View Class</button>
      <button className="button">View schedule</button>

      
      
    </div>
    <div>
    <button className="button">Enrolled Class</button>
    </div>
    </div>
  );
}

export default Test;
