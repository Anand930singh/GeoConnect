import React, { useState } from 'react'
import '../styles/create.css'
import { Any } from 'react-spring';

export default function Create() {
    const [longitude,setLongitude] = useState(Number);
    const [latitude,setLatitude] = useState(Number);
    const getLocation=()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
          });
    }
  return (
    <div className='createContainer'>
        <div className='createGroupHead'>Create Group</div>
        <div className='createGrouptag'>----use location to create group----</div>
        <div className='location'>
            {latitude!==0&& `${latitude}  `} -- {longitude!==0&& `  ${longitude}`}
            <button type='submit' className='button-3' onClick={getLocation}>Get Location</button>
        </div>
        <div><button className='button-37'>Create</button></div>
    </div>
  )
}
