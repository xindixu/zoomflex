import React, { useEffect, useState } from 'react';
import Videos from 'videos';

import {VideoForm} from './forms/videoform';

import Axios from 'axios';
function Add_videos() {
  const API_KEY = `5075aeb0c224063fdb615c496b26ba4a`
  const VideosList = ({item, deleteVideoProp}) =>{

    const deleteVideo = _ => {deleteVideoProp(item)}
    
    return<div className ="card">
        <div>{item.title}</div>
        <div>  <img src={item.image}></img></div>
        <div>{item.genre}</div>
        <div><input type ="button" value ="Delete" onClick ={deleteVideo}/> </div>
    </div>;
}

    const [videos, setVideos] = useState([]);
    const addVideo = video => {
      setVideos([...videos,video])
      alert(`${video.title} has been added!`)
    }
    const deleteVideo = video =>{
      setVideos(videos.filter(videoItem => videoItem.id!==video.id))
      alert(`${video.title} has been removed!`)
    }
    const[movies,setMovies]= useState([])
  const getposturl = (posterpath)=>{
    return `https://www.themoviedb.org/t/p/w440_and_h660_face${posterpath}`
  }
 
useEffect(()=>{
  fetch('https://api.themoviedb.org/3/movie/popular?api_key=5075aeb0c224063fdb615c496b26ba4a&language=en-US&page=1')
  .then(response =>response.json())
  .then(res =>setMovies(res.results))
  

  .catch(err => console.log(err))
},[])

        return( 
          
            <nav class="navbar navbar-expand-lg fixed-top nav-shadow">
            <div class="container-fluid nav-content">
      <a class="navbar-brand" href="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg" width="10" height="10" alt="Zoomflex logo"/>
        <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" width="10" height="10" alt="Zoomflex logo"/>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <script type="text/javascript" src="{{ url_for('static', filename = 'add.js') }}"></script>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a href="/" class="nav-link" data-toggle="modal" data-target="#">
              <span class="material-icons-round vcenter">home</span>
              <span class="d-none d-sm-inline d-xl-block px-1">Home</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="/add_videos" class="nav-link" data-toggle="modal" data-target="#">
              <span class="material-icons-round vcenter">add_circle</span>
              <span class="d-none d-sm-inline d-xl-block px-1">Add Movie</span>
            </a>
          </li>
        </ul>
        <form class="form-inline" id='search' action="/search-results">
          <input type="text" class="form-control" autocomplete="off" name="search" placeholder="Search" id="search"/>
          <button class="btn btn-red" id="submit">
            <span class="material-icons-round vcenter">search</span></button>
        </form>
      </div>
      </div>
 

<div class="container" id="popular-movies">
  <div class="d-flex flex-wrap justify-content-center" id="popular">
  </div>
</div>

<div class="row go-back">
  <a href="javascript:history.back()" class="edit">
    <span class="material-icons-round icon-center">chevron_left</span>
    Go Back
  </a>
</div>

<VideoForm addVideoP ={addVideo}/>
      {
        videos.map(video => <VideosList key ={video.id} item= {video} deleteVideoProp = {deleteVideo}/>)
      }
      <div class="">
          {
            movies.map(video=> {
              return(
                <div className ="card">
                <div class="row">
           
        </div>
        <button onClick={() => window.location.href= `/view/${video.id}`
        }>
       view
      </button>
  
        <a href="/view/{{video.id}}" class="view" id="view">
                <span class="material-icons-round icon-center">edit</span>
                view Movie Info
            </a>
        
                  <img src={video.images}/>
                  <img src={getposturl(video.poster_path)}/>
                  {video.title}  
                {video.id}
                <td> <a href={'/video/'+video.id}>Edit</a></td>
               
                  </div>
              )
            })
          }
        </div>
        
<div id="add-entry-form">
  <div class="row">
    <div class="col-md-12 page-title">
      <p class="icon-title"> <span class="material-icons-round vcenter md-54">add_circle</span> Add movie Entry</p>
    </div>
  </div>
  <form class="form add-movie needs-validation" novalidate>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label for="validationCustom01">movie Title</label>
          <input type="text" class="form-control" placeholder="movie Title" id="movie-title" required/>
          <div class="invalid-feedback">
            Please enter a movie title
          </div>
        </div>
        <div class="form-group">
          <label for="validationServer02">Genres</label>
          <input type="text" class="form-control" placeholder="Genres" id="movie-generes"
            pattern="(.+)+(,(.+)+)*$" required/>
          <div class="invalid-feedback">
            Please enter a list of genres in the form 'genre 1, genre 2, etc.'
          </div>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea class="form-control" placeholder="Description" id="movie-description" rows="3" required></textarea>
          <div class="invalid-feedback">
            Please describe the movie.
          </div>
        </div>
       



    
        <div class="form-group">
          <select id="movie-year" class="custom-select" >
            <option value="" selected disabled>Select a movie release Year</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="before_2020">Before 2020</option>
          </select>
          <div class="invalid-feedback">
            Please give a year.
          </div>
        </div>
        <div class="">
          <h5>length</h5>
        </div>
        <div class="form-group duration">
          
          <div class="input-group mb-2">
            <div class="input-group-prepend">
              <div class="input-group-text">HR</div>
            </div>
            <input type="number" step="0.01" class="form-control" placeholder="0.00" id="movie-duration" required/>
            <div class="invalid-feedback">
              Please give enter a valid duration.
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="">
          <h5>Images(JPG, PNG)</h5>
              <p class="section-description">Please enter links to images</p>
        </div>
        <div class="form-group yt-video">
          <label for="validationServer01">Cover Image</label>
          <input type="text" class="form-control" placeholder="Cover Image" id="cover-img"
            pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)"
            />
          <div class="invalid-feedback">
            Please give a valid .jpg or .png link
          </div>
        </div>
        <div class="form-group">
          <label for="validationServer02">Header Image</label>
          <input type="text" class="form-control" placeholder="Header Image" id="header-img"/>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <button id="add-item-submit" class="btn btn-red btn-create" type="submit">Create movie Entry</button>
    </div>
  </form>
</div>

<div id="confirmationOverlay" class="overlay">
  <div class="overlay-content">
    <span class="material-icons-round md-120">check_circle</span>
    <div class="overlay-text">
      <h1>Your movie has been added!</h1>
    </div>
    <div class="button-options">
      <button class="btn btn-secondary overlay-btn" id="add-another" type="button">Add Another Entry</button>
      <button class="btn btn-red overlay-btn see-now">See it Now!</button>
    </div>

  </div>
</div>


        </nav>
        
      
        );
    }

export default Add_videos;