import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Head from '../Header/Header'

import Swal from 'sweetalert2';
import './MyClasses.css';



//icons
import { FaArrowCircleDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosArrowDroprightCircle } from "react-icons/io";




function MyClasses() {

  const [notices, setNotices] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    //get notices and materials
    axios.get('http://localhost:5000/viewnotice')
      .then(res => {
        setNotices(res.data);
      })
      .catch(err => console.error(err));

    axios.get('http://localhost:5000/showmaterials')
      .then(res => {
        setMaterials(res.data);
      })
      .catch(err => console.error(err));
  }, []);

 
  //delete notice
  const handleDeleteNotice = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this notice?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/deletenotice/' + id)
          .then((res) => {
            console.log('success');
            Swal.fire(
              'Deleted!',
              'Your notice has been deleted.',
              'success'
            ).then(() => {
              window.location.reload(); // Reload the page after successful deletion
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the notice.',
              'error'
            );
          });
      }
    });
  }

  //delete material
  const handleDeleteMaterial = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this material?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete('http://localhost:5000/deletematerial/' + id)
          .then((res) => {
            console.log('success');
            Swal.fire(
              'Deleted!',
              'Your material has been deleted.',
              'success'
            ).then(() => {
              window.location.reload(); // Reload the page after successful deletion
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the material.',
              'error'
            );
          });
      }
    });
  }


  //search function
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMaterials = materials.filter(material =>
    material.lesson_topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //show file
  const showFile = (lesson_Files) => {
    window.open(`http://localhost:5000/files/${lesson_Files}`, "_blank", "noreferrer");
  };

  const downloadFile = async (lesson_Files) => {
    try {
      const url = `http://localhost:5000/files/${lesson_Files}`; // Hardcoded URL
      const response = await axios.get(url, {
        responseType: 'blob'
      });
      const file = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(file);
      link.setAttribute('download', lesson_Files);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  




  return (
    <div>
     <Head/>
      <div>

        <div className="container">



          <div className="main-content">
          
            <div className="class_details">

              <h2>Class Details</h2>
              <div className="class-info">
                <div className="class-title">History - Grade 10</div>
                <i class="fa-solid fa-cloud-arrow-down"></i>
                <div className="class-detail">Teacher: Mr. Smith</div>
              </div>
            </div>
            <div className="notices">
              <h2>Notices</h2>
              <Link to="/createnotice" className="add_button ">Add New Notice <IoIosAddCircle style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /></Link>
              {notices.map((notice) => (
                <div className="notice" key={notice._id}>
                  <div className="notice-date">{notice.date}</div>
                  <div className="notice-title">{notice.topic}</div>
                  <div className="notice-description">{notice.description}</div>
        
                  <Link to={`/editnotice/${notice._id}`} className="edit_button">Edit Notice <FaEdit style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /></Link>
                  <button className="delete_button" onClick={(e) => handleDeleteNotice(notice._id)}>Delete Notice <MdDelete style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /> </button>

                </div>
              ))}
            </div>
            <div className="lesson-container">
              <h2>Lesson Materials</h2>
              <Link to="/addmaterial" className="add_button ">Add New Material <IoIosAddCircle style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /></Link>

              <div className="search_bar_container">
                <input type="search" className="search_input" placeholder="Search Materials..." value={searchTerm} onChange={handleSearchChange} />
              </div>
              <div className="month">Materials for March 2024</div>
              {filteredMaterials.map((lesson) => (
                <div className="lesson" key={lesson._id}>
                  <div className="lesson-title">{lesson.lesson_topic}</div>
                  <div className="lesson-date">Date: {lesson.lesson_date}</div>
                  <div className="lesson-description">  {lesson.lesson_description}</div>
                  <button className="material_link" onClick={() => showFile(lesson.lesson_Files)}>View Material <IoIosArrowDroprightCircle style={{ marginTop: '5px', marginLeft: '2px', fontSize: '12px' }} />
                  </button>
                  <button className="material_link" onClick={() => downloadFile(lesson.lesson_Files)} >Download <FaArrowCircleDown style={{ marginTop: '5px', marginLeft: '2px', fontSize: '12px' }} />

                  </button>
                  <Link to={`/editmaterial/${lesson._id}`} className="edit_button">Edit Material <FaEdit style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /></Link>
                  <button className="delete_button" onClick={(e) => handleDeleteMaterial(lesson._id)}>Delete Notice <MdDelete style={{ marginTop: '5px', marginLeft: '2px', fontSize: '13px' }} /> </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default MyClasses;
