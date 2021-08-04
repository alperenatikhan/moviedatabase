import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel, Card} from 'react-bootstrap'
import {RiStarSFill} from 'react-icons/ri'
import {GiTrophyCup} from 'react-icons/gi'
import {BiCameraMovie, BiMovie} from "react-icons/bi";
import Image from 'next/image';



function MovieCard(props) {
    let data = props.data;
    
    let [movieImage,setMovieImage]= useState("");
    let id = data.id;

    useEffect(() => {
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=e4737124`).then(data=> data.json()).then(data => setMovieImage(data.Poster))
    }, [id])



    return (
 <>
 <Card style={{height:"28rem", width:"25rem"}} >
            <Card.Img variant="top" src= {movieImage} style={{height:"12rem"}} />
     <div style={{padding:"1rem 0 0 1.5rem"}}>
         <p className="card-header-title">
     {data.title} </p>

     <p>{movieImage} </p>
    
            <p> <GiTrophyCup style={{color:"orangered", margin:"0.2rem"}}/> IMDB Rank: <strong>{data.rank}</strong>
            <span>
            <RiStarSFill style= {{color:"orangered", margin:"0.2rem"}}/>Rating: <strong>{data.rating}</strong> </span> </p>
            <p> <BiCameraMovie style= {{color:"orangered", margin:"0.2rem"}}/>Director: <strong>{data.directors}</strong></p>
            <p style={{maxWidth:"30ch"}}>  <BiMovie style= {{color:"orangered", margin:"0.2rem"}}/>Actors: <strong>{data.stars}</strong></p>
            

       </div>     
     </Card>       
            
</>
    )
}

export default MovieCard;
