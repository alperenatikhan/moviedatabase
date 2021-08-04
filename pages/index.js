import React, {useEffect, useState} from "react";
import Head from 'next/head';
import MovieCard from "../components/MovieCard";
import {BiCameraMovie} from "react-icons/bi";
import {FaSearchPlus} from "react-icons/fa";
import {Carousel} from "react-bootstrap";
import Image from "next/image"

export default function Home() {
  let movieData=[];
  let [data, setData] = useState([]);
  let [pageNum,setPageNum] = useState(1);
  let [start,setStart] = useState(0);
  let [end, setEnd] = useState(6);

let upToTen=[];
for(let x=1; x<11;x++){
  upToTen.push(x);
}


  useEffect(() => {
    fetch("https://imdbtopmovies-ddf67-default-rtdb.europe-west1.firebasedatabase.app/.json")
    .then(data => data.json())
    .then(data => {
      setData(data);
    });
}, []);

useEffect(() =>{
  setStart(Math.floor((pageNum-1)*5));
  setEnd(Math.floor(pageNum*5));

},[pageNum])

  return (
    <div style= {{backgoundColor:"#0b090a"}}>
      <Head>
        <title>Top 100 movies in IMDB </title>
        <meta name="description" content="Browse and search top movies in IMDB" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className="header" style={{display:"flex", justifyContent:"center",alignItems:"center", margin:"1rem auto"}}>
        <Image src="https://images.unsplash.com/photo-1560109947-543149eceb16?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80" style={{width:"100px",height:"150px", marginRight:"2vw"}} />
        
        <h1 className="text is-size-3" style={{color:"#d00000"}}>
          Welcome to Cine-Wiki </h1>
          </div>

          <article className="panel is-light is-centered" style={{width:"60%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", margin:"1rem auto"}} >
          <p className="panel-heading">
Search for Movies 
    <input className="input is-danger is-fullwidth" type="text" placeholder="Enter movie name" style={{margin:"auto"}}/>
    <button className="button is-danger is-fullwidth"> <BiCameraMovie style={{margin:"1vh"}}/> Check </button>
    </p>
         

          </article>


   <article className="panel is-light is-centered" style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center", margin:"1rem auto"}} >           
   <p className="panel-heading " style={{width:"80%"}}>
    Top IMDB movies <div className="field is-pulled-right"> {upToTen.map(num=> <button onClick={(el)=> setPageNum(el.target.value) } className="button is-warning is-inverted is-small m-1 " value={num} key={num}>{num} </button>)}
  </div></p>

<div style={{marginTop:"0.2rem"}}>
       
   
        <Carousel variant="dark">
     {data.slice(start,end).map(item =><Carousel.Item interval={3000} key={item.id}><MovieCard key= {item.id} data={item}/></Carousel.Item>)}
     </Carousel>

     </div>
</article>

    </div>
  )
}
