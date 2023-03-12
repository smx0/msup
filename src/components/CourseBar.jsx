import React, {useContext} from "react";
import iconfill from '../assets/starrf.png'
import iconeempty from '../assets/starre.png'
import { useNavigate } from 'react-router-dom'
import { brad } from "../contexts/Auth";


export default function CourseBar(props) {

    const llama = useContext(brad)

    let bookmarkIcon = props.favClasses.includes(props.courseID) ? iconfill : iconeempty

    // sent to CourseBar cpns 
    const navigate = useNavigate()


    return (
        <div className="bar">

            <div className="bar--content" onClick={() => navigate(`/${props.courseID}`)}>
                <p className="bar--id">{props.id}</p>
                <p className="bar--name">
                    {props.courseName}</p>
            </div>

            {
                llama.user && 
            <div className="bar--imgCont"
                 onClick={() => props.toggleCourseFav(props.id)}>
                <img
                    className="bar--fav"
                    src={bookmarkIcon}
                    alt="fav"/>
            </div>
            }


        </div>
    )
};