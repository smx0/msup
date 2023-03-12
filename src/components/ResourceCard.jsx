import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCircleExclamation, faBook, faScroll, faVideo, faFireAlt, faCommentAlt} from '@fortawesome/free-solid-svg-icons'
import { supabase } from '../client'
import { brad } from '../contexts/Auth'
import { toast, Toaster } from 'react-hot-toast'

// this is a single resource card!!! 
export default function ResourceCard(props) {
    
    // context to check for user login 
    const llama = useContext(brad)

    // destructuring props data 
    const { id, from, likes, location, name, topic, type, created_at} = props.data
    
    // btn status 
    const [btn_status, setBtn_status] = useState(false)
    const [btn_likeCount, setBtn_likeCount] = useState()

    // state to set comments 
    const [comments, setComments] = React.useState()

    
    // gets comment data from DB 
    React.useEffect(() => {
    
        // console.log('triggerComQ2 in Resource Card in useFx for getting comment data')

        // this is just the def 
        async function getComments() {
            const res = await supabase
                .from('comments')
                .select('comment')
                .eq('parent_resource', id)

                // console.log("\tdata is",res.data)

                // res.data.forEach( row => console.log(row.comment))
                // res.data.forEach( row => commentsArray.push(row.comment))
                // commentsArray.forEach(item => console.log(item))
                // console.log('comments on',id,'are (flat)',res.data.map( row => row.comment))
                setComments(res.data)
        }   
        // this actually calls the function 
        getComments()

    }, [props.triggerComQ2])


    // gets data from DB 
    React.useEffect(() => {

        // gets the like status
        async function getLikeStatus() {
            const res = await supabase
                .from('likedRes')
                .select()
                .eq('from_user', llama.user.id)
                .eq('parent_resource', id)
                
                // console.log(id, res)
                if (res.data) {
                    if (res.data.length == 1) {
                        // console.log(id, 'is', res.data[0].btn_status)
                         setBtn_status(prev => res.data[0].btn_status)
                        // console.log('this rc set to', btn_status)
                    }
                }
            
            const res2 = await supabase
                .from('resources')
                .select('likes')
                .eq('id', id)
                .single()
                
                // console.log('hi', res2.data.likes)
                setBtn_likeCount(res2.data.likes)
        }

        if (llama.user) {
            getLikeStatus()
        }
        // console.log(props.trigger02,'hi')
    }, [props.trigger02])



    const commentBox = []

    if (comments) {
        // console.log("exist")
        comments.forEach( row => commentBox.push(
            <div className='r-card-comment-box'> 
            {row.comment} 
            </div>))

    } else {
        // console.log("nothing here")
        // commentBox.push(<div className='r-card-comment-box'>nothing here</div>)
        }

    // determine what icon is displayed in header 
    function displayIcon() {
        if (type == 'video') {
            return faVideo
        } if (type =='textbook')
            return faBook
        if (type == 'webpage') {
            return faScroll
        }
    }

    // reutrns styling for likes button
    const likeStyle = btn_status ? {color: 'red'} : { color: 'orangered', opacity: 0.1} 

    // used to make topic pills
    const topicPills = topic.map( topic => <p key={topic} className="topic-pill">{topic}</p>)
    // style the word 'from' 
    const spanStyle = {opacity: 0.5, fontWeight: 'normal'}
    
    function giveToast(message) {
        toast(message, {
            style: {
              // backgroundColor: '#fa757566',
              backgroundColor: '#24293666',
              border: '1px solid cyan',
              borderRadius: '6px',
              color: 'cyan'
            },
            position: 'bottom-center'
          })
    }



    return (

        <div className='r-card'>
            <div className='r-card-info'>

                <div className='r-card-icon-and-name-and-link'>
                    <div className="r-card-icon">
                        <FontAwesomeIcon
                            icon={displayIcon()}
                            color='white'
                            size='xl' /></div>

                <a href={location} target="_blank" className='r-card-name'>{name}</a>

                <div className='r-card-numOfLikes-Cnt'
                    onClick={() => props.handleLikeBtnClickfromResources(id, btn_status)}
                    >
                    <div className='r-card-numofLikes-Num'>{likes}</div>
                <div className='rcnltucnt'>
                    <FontAwesomeIcon
                        icon={faFireAlt}
                        style={likeStyle}
                        className="r-card-numOfLikesNum-tmbup"/></div>

                </div>

                </div>

                <div className='r-card-topicPills-cnt'>{topicPills}</div>

                {from && <p className='r-card-from'>
                    <span style={spanStyle}>from </span> {from}</p>}</div>
                <div className='rc-commentBox-cnt'>{commentBox}</div>
                
                
                {
                    llama.user &&
                <div className='rc-footer'>
                    <FontAwesomeIcon 
                        icon={faCommentAlt} 
                        className='rc-comment-icon'
                        onClick={() => props.handleClickfromResources(id, name)}
                        />
                    <FontAwesomeIcon 
                    icon={faFileCircleExclamation} 
                    className='rc-repair-icon'
                    onClick={() => giveToast("will add later \nsend email for now plz 💤")}
                    />
                </div>
                }



        </div>
    )
}