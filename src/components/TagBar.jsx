import React from 'react'
import { PuffLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function TagBar(props) {
    
    const { tags, handleClick, colorsArray } = props

    // used to display puff loader 
    const [loading, setLoading] = React.useState(true)
    
    // state for searchbar (inputs require state as value field) 
    const [tagFilterValue, setTagFilterValue] = React.useState('');
    const stringToSearch = tagFilterValue.toString().toLowerCase()


    // console.log('props in tagbar are:',props.tags)

    // const filteredTags = tags.some( item => item.includes(stringToSearch))
    const filteredTags = tags?.filter( item => item.includes(stringToSearch))


    const tagPills = []
    filteredTags?.forEach( (item, index) => tagPills.push(
        <div 
            className='tag' 
            key={item}
            // style={{backgroundColor: getRndColor()}}
            onClick={() => handleClick(item)}
            style={{ backgroundColor: colorsArray[index] }}>
            {item}
        </div>))

    // used to set filterValue 
    function handleChangeSearchBox(event) {
        setTagFilterValue(event.target.value)
    }

    // used to turn off animation 
    function toggleLoad(which, time) {
        setTimeout(() => {
            setLoading(!which)
        }, time);
        // console.log('hi')
        // return loading
    }
    
    return (
     <div className='tagbox'>
            <div className='tagbox-icon-and-search'>
            <div className='fasearch-ctn'>
                    < FontAwesomeIcon  icon={faSearch} color='white' /></div>
            <div className='tagbox-search-container'>
                <input
                    autoFocus
                    className='tagbox-search'
                    type="text"
                    placeholder='search topics'
                    value={tagFilterValue}
                    onChange={() => handleChangeSearchBox(event)} 
                    />
            </div></div>
        
            
            {
                loading ? 

                <div className='animation-holder'>
                    < PuffLoader
                        loading={toggleLoad(loading, 500)}
                        // loading={loading}
                        // loading={true}
                        size={120}
                        color={'white'}/>
                </div>

                :

                <div className='tagholder'>
                    {tagPills} </div>
            }





    </div>
  )
}