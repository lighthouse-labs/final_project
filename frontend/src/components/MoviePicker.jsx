import React, { useState, useEffect, useRef } from 'react'
// import TinderCard from '../react-tinder-card/index'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import '../MoviePicker.css'

export default function MoviePicker() {
  const [ip, setIP] = useState('');
  const [movies, setMovies] = useState([]);
  const movi = [];
  
  //creating function to load ip address from the API
  const getData = () => {
    axios.get('https://geolocation-db.com/json/').then((res,req) => {
    // console.log(res.data);
    setIP(res.data.IPv4)
  })
  }

  useEffect(() => {
    axios.get("http://localhost:3001/api/users/movielist/1").then((res,req) => {
    for(let i of res.data) {
    axios.get(`https://api.themoviedb.org/3/movie/${i.movie_id}?api_key=79ea73dd8ffddae85c10ba47e73e9093&language=en-US`).then((res,req) => {
    //  console.log(res.data) 
    movi.push(res.data)
  })
}
setMovies(movi)
})
  }, [])
  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()
  

  }, [])
  console.log(movies);
  const url = 'https://image.tmdb.org/t/p/w200'
  const characters = movies
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className = 'root'>
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Movie Picker</h1>
      <h2>Swipe right if you want to watch the movie</h2>
      <h2>Swipe left if you don't</h2>
      <br/>
      <div className='cardContainers'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.id} onSwipe={(dir) => swiped(dir, character.original_title)} onCardLeftScreen={() => outOfFrame(character.original_title)}>
            <div style={{backgroundImage: `url('https://image.tmdb.org/t/p/w200${character.poster_path}')`}} className='cards'>
            <h3>{character.original_title}</h3>
            </div>
          </TinderCard>
          
        )}
      </div>
    
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
    </div>
  )
}
  
