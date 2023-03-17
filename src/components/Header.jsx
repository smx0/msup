import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookOpen, faHouse } from "@fortawesome/free-solid-svg-icons"
import CourseData from "./CourseData";
import { useLocation } from "react-router-dom";

export default function Header() {
    
    let courseIDfromURL = ''
    let courseName = ''

    const useLocInfo = useLocation()
    // console.log('ul', useLocInfo.pathname)
    const urlLastFourDigits = /\d{4}$/
    // console.log(urlLastFourDigits.exec(useLocInfo.pathname))
    const atCoursePage = urlLastFourDigits.test(useLocInfo.pathname)
    if (atCoursePage) {
        courseIDfromURL = urlLastFourDigits.exec(useLocInfo.pathname)
        courseName = CourseData.find( elm => elm.courseID == courseIDfromURL).courseName
        // console.log('cn is',courseName)
    } else {
        // console.log('somewhere else!!')
    }

    return (
        <div className="header">
            <p className="header-msup">
                <span style={{ color: 'red' }}>m</span>
                <span style={{ textDecoration: 'underline dotted red' }}>
                    sup</span> /</p>
            
            {
                atCoursePage ? 
                    
                    <div className="course-header"> 
                        <div className="courseID">{courseIDfromURL} </div>
                        <div className="courseName">{courseName}</div>
                    </div>
                    
                :
                    
            <p className="header-body">
                <span className="header-sup">
                            sup</span>
                        <span className="header-other">plemental resources for</span>

                        <span className="header-m"> m</span>
                        <span className="header-other">cito {courseIDfromURL}</span> </p>

            }

        </div>

    )
};