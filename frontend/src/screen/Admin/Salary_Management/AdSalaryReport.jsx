import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';


const LessonReport = () => {
    const [allLessons, setAllLessons] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedMonth = queryParams.get('month');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const onlineRes = await axios.get('http://localhost:5000/users');
                const Lesson = onlineRes.data;

                const filteredLessons = Lesson.filter(lesson => {
                    const lessonDate = new Date(lesson.Date);
                    return lessonDate.getMonth() === parseInt(selectedMonth.split('-')[1]) - 1; // Month is zero-based
                });
                setAllLessons(filteredLessons);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLessons();
    }, [selectedMonth]);



    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            padding: 20,
        },
        row: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#000',
            alignItems: 'center',
            height: 24,
        },
        header: {
            fontWeight: 'bold',
        },
        cell: {
            flexGrow: 1,
            fontSize: 10,
        },
    });


    const MyDocument = ({ allLessons }) => (
        <Document>
            <Page size="A4">
                <View>
                    <Text style={styles.header}>My Lessons for {selectedMonth}</Text>
                </View>
                <br /><br /><br /><br />
                <View style={styles.row}>

                  
                    <Text style={styles.cell}>Grade</Text>
                    <Text style={styles.cell}>Subject</Text>
                    <Text style={styles.cell}>Teacher</Text>
                    <Text style={styles.cell}>Date</Text>
                    <Text style={styles.cell}>Topic</Text>
                    <Text style={styles.cell}>File Type</Text>
                </View>
                {allLessons.map((lesson, index) => (
                    <View key={index} style={styles.row}>
                     
                        <Text style={styles.cell}>{lesson.TeacherName}</Text>
                        <Text style={styles.cell}>{lesson.TeacherID}</Text>
                        <Text style={styles.cell}>{lesson.teachername}</Text>
                        <Text style={styles.cell}>{lesson.lesson_date}</Text>
                        <Text style={styles.cell}>{lesson.lesson_topic}</Text>
                        <Text style={styles.cell}>{lesson.lesson_fileType}</Text>
                    </View>
                ))}
        </Page>
        </Document >

        
    );




return (
    <div className='lesson-report'>
        <div className='bodymvl'>
            <h1 className='h1mvl'>Lesson Report for {selectedMonth}</h1>
            <br /><br /><br /><br />
            <PDFDownloadLink document={<MyDocument allLessons={allLessons} />} fileName="lessons.pdf">
                {({ loading, error }) => (
                    loading ? 'Loading document...' : (error ? 'Error generating PDF' : 'Download PDF')
                )}
            </PDFDownloadLink>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            
                            <th>Grade</th>
                            <th>Subject</th>
                            <th>Teacher</th>
                            <th>Date</th>
                            <th>Topic</th>
                            <th>File Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allLessons.map((lesson, index) => (
                            <tr key={index}>
                              
                                <td>{lesson.TeacherName}</td>
                                <td>{lesson.classid}</td>
                                <td>{lesson.teachername}</td>
                                <td>{lesson.subject}</td>
                                <td>{lesson.lesson_topic}</td>
                                <td>{lesson.lesson_fileType}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
);
};

export default LessonReport;

