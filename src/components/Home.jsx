import React, {useContext, useEffect, useState} from 'react'
import { supabase } from '../client'
import CourseBar from '../components/CourseBar'
import CourseArray from './CourseData'
import { brad } from '../contexts/Auth'
import { toast, Toaster } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  // context from brad 
  const llama = useContext(brad)

  // use CoursesArray to create state 
  const [courses, setCourses] = React.useState(CourseArray)

  // state for class searchbar (inputs require state as value field) 
  const [filterValue, setFilterValue] = React.useState('');

  // state, array  of ints, used to set fav classes
  const [favClasses, setFavClasses] = React.useState([])
  

  // trigger state, used to trigger getting info from DB
  const [triggerMe, setTriggerMe] = React.useState(false)

  // used to set filterValue 
  function handleChangeSearchBox(event) {
    setFilterValue(event.target.value)
  }

  const stringToSearch = filterValue.toString().toLowerCase()
  // don't DL, need sql use const keysToSearch = ["courseID", "courseName"]
  let filteredCourseRaw = (courses.filter( item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(stringToSearch))
    }))
  

  // called to set favClasses on page load
  useEffect( ()=> {
    // console.log('...ue on load + triggerChange')
    // console.log('\tcur fC$  is:', favClasses)

      // get favclasses from db and use it to set state
    async function getFCFromDBAndSetState() {
      // console.log('...getfcDB')
      const res = await supabase 
      .from('favclasses')
      // .select()
      .select('fav_classes')
      .eq('user_id', llama.user.id)

      // console.log('\tresponse:', res?.data[0].fav_classes)
      // console.log("\tnow we'll set $")
      setFavClasses(res?.data[0].fav_classes)
      // res.data.forEach( row => console.log(row.fav_classes))
      // need to set state too
    }


    if (llama.user) {
      getFCFromDBAndSetState()
    }


  }, [triggerMe])



  // update favorite courses in database
  async function updFavClassesInDB(classes) {
    // console.log('adding',classes)
    
    const data = await supabase 
      .from('favclasses')
      // .select()
      .update({'fav_classes': classes})
      .eq('user_id', llama.user.id)
      // .eq('id',13)

      // console.log('after update, data is',data)
      setTriggerMe(prev => !prev)
  }


  // called when a class's fav button is toggled 
  function handleCourseFavToggle(id) {
    // console.log('id is',id)
    
    toast('toggled fav!', {
      style: {
        backgroundColor: '#24293666',
        border: '1px solid #58caff',
        borderRadius: '6px',
        color: '#58caff'
      },
      position: 'bottom-center'
    })

    if (favClasses.includes(id)) {
      
      const filteredClasses = favClasses.filter( item => item !== id)
      updFavClassesInDB(filteredClasses)
      // setFavClasses ( prev => {
        // return prev.filter( item => item !=id )
      // })
      // updFavClassesInDB(favClasses)
      // console.log('did not remove',id)

    } else {
      
      // const updatedFavClasses = []
      // favClasses.forEach( elm => updatedFavClasses.push(elm))
      const updFavClasses = []
      favClasses.forEach( item => updFavClasses.push(item))
      updFavClasses.push(id)

      updFavClassesInDB(updFavClasses)
      // console.log('added',id,'to fc state')

    }
  }
  // console.log('cur fc:',favClasses)


  // use cur state array to pass props to the CourseBar components
  const filteredCoursesForCpn = filteredCourseRaw.map(course => {
    return <CourseBar
      key={course.courseID}
      {...course}
      id={course.courseID}
      toggleCourseFav={handleCourseFavToggle}
      favClasses={favClasses}
    />
  })

  let favCoursesCpn = []
  // DL, fav is per account basis create fav courses section 
  if (favClasses) {
    const favCoursesData = courses.filter( item => favClasses.includes(item.courseID))
    // console.log('fav class array of objs:',favCoursesData)
    // console.log('favClasses is:',favClasses)

    favCoursesCpn = favCoursesData.map(course => {
      return <CourseBar
        key={course.courseID}
        {...course}
        id={course.courseID}
        toggleCourseFav={handleCourseFavToggle}
        favClasses={favClasses}
      />
    })
    // console.log('cnp len',favCoursesCpn.length)
  }
  // console.log('outside cnp len',favCoursesCpn.length)

    return (
    <div>
        <Toaster />
        <div className='app-body'>

            { llama.user && 
            <div className='app-fav'>
                <p className='sectionName'>fav</p>

                {favCoursesCpn.length > 0 ? 
                 favCoursesCpn : 
                
                <p className='app-fave-nothing'>
                    ( •_•)σ hit the red star to the right of a class name to pin it here
                </p> }

            </div>
            }

            <div className='allAndSearch'>
            <p className='sectionName all'>
                {filteredCourseRaw.length < courses.length ? 
                filteredCourseRaw.length == 1 ? "1 result" :
                `${filteredCourseRaw.length} result(s)` : 
                "all"}
            </p>
            <div className='app-searchbar-container'>
                  
                  <div className='fasearch-ctn'>
                    < FontAwesomeIcon  icon={faSearch} color='white' /></div>
                
                <input
                    autoFocus
                    className='app-searchbar'
                    type="text"
                    placeholder='search classes...'
                    value={filterValue}
                    onChange={() => handleChangeSearchBox(event)}/>

            </div> 
            </div>


            <div className='coursebar-ctn'>
            {filteredCoursesForCpn}</div>
        </div>
    </div>
)
}
