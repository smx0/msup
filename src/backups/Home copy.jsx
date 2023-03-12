import React from 'react'
import CourseBar from '../components/CourseBar'

  
export default function Home() {


  // use CoursesArray to create state 
  const [courses, setCourses] = React.useState([])

  // gets data from server to set state on app load/reload
  React.useEffect(() => {
    // this is just the def 
      async function getTaskJSON() {
          const res = await fetch("http://localhost:3000/classes")

          const data = await res.json()
          setCourses(data)
        //   console.log(numOfClasses)
          // console.log("@useEffect "+data);
      }
      // this actually calls the function 
      getTaskJSON()
  }, [])

  // state for searchbar (inputs require state as value field) 
  const [filterValue, setFilterValue] = React.useState('');
  
  // debug print msgs 
  // console.log("outside fv is "+filterValue)
  // console.log("outside, state # of objs is "+(courses.length))

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
  
  // use cur state array to pass props to the CourseBar components
  const filteredCoursesForCpn = filteredCourseRaw.map(course => {
    return <CourseBar
      key={course.courseID}
      {...course}
      id={course.courseID}
      toggle={toggleFavorite2}
    />
  })

  // create fav courses section 
  const favCoursesData = courses.filter( item => item.favorite == true)
  const favCoursesCpn = favCoursesData.map(course => {
    return <CourseBar
      key={course.courseID}
      {...course}
      id={course.courseID}
      toggle={toggleFavorite2}
    />
  })


  // TODO delete when not used anymore 
  // toggle for when when data was in js file 
  function toggleFavorite(id) {
    // console.log("togFav ran on "+id)
    setCourses(prev => {
      return prev.map((item) => {
        return item.courseID === id ? { ...item, favorite: !item.favorite } : item
      })
    })
  }
  
  // using given id, get that task from server 
  async function fetchClass(id) {
    const res = await fetch(`http://localhost:3000/classes/${id}`)
    const data = await res.json()
    return data 
  } 

  // TODO toggle used when data is in mock db 
  async function toggleFavorite2(id) {
    // we wrote fetchClass above 
    // get info from server about class with given id
    const classToToggle = await fetchClass(id)
    
    // take that info and reverse the reminder value 
    const classWithToggledFav = {...classToToggle, favorite: !classToToggle.favorite}

    // use the updated task info to overwrite the version of that task on server 
    const res = await fetch (`http://localhost:3000/classes/${id}`,{
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(classWithToggledFav)
    }) 

    // now that the server task has been updated
    // we request that info and store it 
    const data = await res.json()    
    // console.log("in tf2 "+JSON.stringify(data))

    // set state for courses with toggled class fav 
    // TODO doesn't get current data from db
    // do we need to use db data to change current state?
    setCourses(prevArray => {
      return prevArray.map(item => {
        // return item.id === id ? {...item, favorite: !item.favorite} : item
        return item.id === id ? {...data, favorite: data.favorite} : item
      })
    })
  }



    return (
    <div>
        <div className='app-body'>
            <div className='app-fav'>
                <p className='sectionName'>fav</p>
                {favCoursesCpn.length > 0 ? 
                favCoursesCpn : 
                <p className='app-fave-nothing'>
                    {/* (Click the red star next to a course to pin it here) */}
                </p>}
            </div>
            <p className='sectionName'>
                {filteredCourseRaw.length < courses.length ? `${filteredCourseRaw.length} results` : "all"}</p>
            <div className='app-searchbar'>
                <input
                    type="text"
                    placeholder='search'
                    value={filterValue}
                    onChange={() => handleChangeSearchBox(event)}/>
            </div>
            {filteredCoursesForCpn}
            <button className="button-64" role="button"><span className="text">Button 64</span></button>
        </div>
    </div>
)
}
