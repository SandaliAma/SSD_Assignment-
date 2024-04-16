import React from 'react';
import './Home.css';
import {Link } from 'react-router-dom';

function Home() {
  return (
    <div className='bodyC'>
          <div className="nimanji1" className1="container5"><br />
 <Link to={'/create'}>
    <button type="submit" name="AddSalary" className="addsalary">Add Salary</button>
</Link>
<Link to={'/'}>
    <button type="submit" name="ViewSalary" className="ViewSalary">View Salary</button>
</Link>
<Link to={'/TeacherView'}>
    <button type="submit" name="GenerateReport" className="generate">Generate Report</button>
</Link>
  </div>

    </div>

  )
}

export default Home
