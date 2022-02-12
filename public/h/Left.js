import React from 'react'

export default function Left() {
    return (
        <div>
            <div className="image"> 
         <img src="\starling.png" style={{width:"28%" , height:"15rem",objectFit:"fill",display:"block",margin:"auto"}}/>
         </div>
         <div className="image"> 
         <img src="\social.jpeg" style={{width:"50%" , height:"20rem",objectFit:"fill",display:"block",margin:"auto"}}/>
         </div>
         <div className="slogan"><p>Explore more, Interact better</p></div>
        </div>
    )
}
