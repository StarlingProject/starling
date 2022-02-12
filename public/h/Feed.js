import React from "react";
import TweetBox from "./TweetBox";
import Posts from "./Posts";
import "./Feed.css";

const post = [{
  nomComplet:"Atsfaha nabila 1", 
      pseudo:"bila_bila",
      avatar: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
      tweet:"Ni avant ni après, tout vients quand il le faut", 
      image: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" 
},
{
  nomComplet:"Atsfaha nabila 2", 
      pseudo:"bila_bila",
      avatar: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
      tweet:"Ni avant ni après, tout vients quand il le faut", 
      image: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" 
},
{
  nomComplet:"Atsfaha nabila 3", 
      pseudo:"bila_bila",
      avatar: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
      tweet:"Ni avant ni après, tout vients quand il le faut", 
      image: "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" 
}]


function Feed() {



 
  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />
      <Posts nomComplet="Atsfaha nabila" 
      pseudo="bila_bila"
      avatar = "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"
      tweet="Ni avant ni après, tout vients quand il le faut" 
      image="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
      
       <Posts nomComplet="Atsfaha nabila" 
      pseudo="bila_bila" 
      avatar = "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"
      tweet="Ni avant ni après, tout vients quand il le faut"  /> 
        
        {
          post.map((post)=> (
             <Posts nomComplet={post.nomComplet} pseudo={post.pseudo} avatar={post.avatar} tweet={post.tweet} image={post.image} /> 
          ))
        }
        
          
          
      
     
    </div>
  );
}

export default Feed;
