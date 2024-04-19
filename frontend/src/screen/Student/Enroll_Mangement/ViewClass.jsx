import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from React Router

function ViewClass() {
  return (
    <div>
     <h2>PayNow</h2>
        <Link to="/viewonline"><button className="button">PayNow</button></Link> {/* Link to Maths class */}

    </div>
  )
}

export default ViewClass
