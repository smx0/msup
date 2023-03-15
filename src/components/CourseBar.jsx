import React, {useContext} from "react";
import iconfill from '../assets/starrf.png'
import iconeempty from '../assets/starre.png'
import { useNavigate } from 'react-router-dom'
import { brad } from "../contexts/Auth";
import { supabase } from "../client";
import bookmark from '../assets/bookmark.png'

export default function CourseBar(props) {

    const llama = useContext(brad)

    let bookmarkIcon = props.favClasses.includes(props.courseID) ? iconfill : iconeempty

    // count of resources for this class
    const [totalResourceCount, setTotalResourceCount] = React.useState(0)

    // sent to CourseBar cpns 
    const navigate = useNavigate()

    React.useEffect(() => {
        async function getCount() {
            const res = await supabase
                .from('resources')
                .select('*', {count: 'estimated', head: true})
                .eq('courseID', props.courseID)
            setTotalResourceCount(res.count)   
            console.log(res)
         }
    
        getCount();
    }, [])
    
    const resCountOpacity = totalResourceCount > 0 ? {opacity: 1} : {opacity: 0.1}

    return (
        <div className="bar">

            <div className="bar--content" onClick={() => navigate(`/${props.courseID}`)}>
                <p className="bar--id">{props.id}</p>
                <p className="bar--name">
                    {props.courseName}</p>
            </div>

            <div className="bar-resCount-ctr" style={resCountOpacity}>
                <div className="bar-resCount">{totalResourceCount}</div>
                <img className="bar-resCount-bookmark" src={bookmark} alt="bookmark" />
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