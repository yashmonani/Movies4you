import React from 'react'
const MovieCard=({movie})=>{
    return(
        <div className='movie'>
        <div>
        <p>{movie.Year}</p>
        </div>
  {/*write now we dont have access to movie. , so we will pass through props\
  so write props in MovieCard arrow function, but so we don have to repeat every 
  time writing props. everytime, so we destructure the props use object destructuring
  , use {} than something that passed inside those props -{movie} */}
        <div>
          <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https.//via.placeholder.com/400'} alt={movie.Title}/>
          {/*if poster not equals to NA than movie.poster but if there 
          is no image than we can render https..(placeholder image) */}
        </div>
       <div>
       <span>{movie.Type}</span>
       <h3>{movie.Title}</h3>
       </div>
     </div>
    );
}

export default MovieCard;