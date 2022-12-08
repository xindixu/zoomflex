import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import {VideoForm} from '../lib/videoform';

const Videos: NextPage = () => {
  const router = useRouter()
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
     
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a href="/" class="nav-link" data-toggle="modal" data-target="#">
              <span class="d-none d-sm-inline d-xl-block px-1">Home</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="/add_videos" class="nav-link" data-toggle="modal" data-target="#">
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
                <span class="material-icons-round icon-center"></span>
                {video.title}  
            </a>
        
                  <img src={video.images}/>
                  <img src={getposturl(video.poster_path)}/>
                
                <td> <a href={'/video/'+video.id}>Edit</a></td>
               
                  </div>
              )
            })
          }
        </div>
        




        </nav>
        
      
        );
    }

export default Videos
