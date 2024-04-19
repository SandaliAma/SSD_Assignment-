import React from 'react';
import './Home.css';
import {Link } from 'react-router-dom';
import Head from '../Header/Header'

function Home() {
  return (
    <div>
    <Head/>
    <div className="bodyst">
          <div className="nimanji1" className1="container5"><br />
 <Link to={'/create'}>
    <button type="submit" name="AddSalary" className="addsalary">Add Salary</button>
</Link>
<Link to={'/managersalary'}>
    <button type="submit" name="ViewSalary" className="ViewSalary">View Salary</button>
</Link>
<Link to={'/TeacherView'}>
    <button type="submit" name="GenerateReport" className="generate">Generate Report</button>
</Link>
  </div>

    </div>
    </div>

  )
}

export default Home
