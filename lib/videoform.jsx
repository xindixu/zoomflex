import React,{useState} from 'react';
import Axios from 'axios';
export const VideoForm=({addVideoP}) =>{

    const [title,setTitle] = useState('');
    const [image,setImage]= useState('');
    const [genre,setGenre]= useState('');

    const addVideo =_ => {
        Axios.post('https://api.themoviedb.org/3/movie/popular?api_key=5075aeb0c224063fdb615c496b26ba4a&language=en-US&page=1',)
        
        addVideoP({
        id: (new Date).getTime(),
        title,image,genre
    })
    setTitle('');
    setImage('');
    setGenre('');
}
    return<div>
        <h1>Add Video</h1>
        <input type= "text" placeholder ='title' value={title} onChange={
            event=>{
           setTitle(event.target.value) 
            }
        }/>
        <input type= "text" placeholder ='image'value={image} onChange={
            event=>{
           setImage(event.target.value) 
            }
        }/>
        <input type= "text" placeholder ='genre' value={genre} onChange={
            event=>{
            setGenre(event.target.value) 
            }
        }/>
        <input type= "button" value= 'Add' onClick={addVideo}/>
    </div>
}
export default VideoForm;
