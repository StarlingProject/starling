import React, {useState} from "react";
import "./Post.css";
import "./TweetBox.css";
import { Avatar } from "@material-ui/core";
import { BsChatDots} from "react-icons/bs";
import { AiOutlineRetweet} from 'react-icons/ai'
import { BsHeart } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import MenuIcon from '@mui/icons-material/Menu';
import Commentaire from './commentaire'

const Posts =   (props) => {
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  console.log(showComment)

    return (
      <div className="post" >
        <div className="post__avatar">
          <Avatar src={props.Avatar}/>
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
              {props.nomComplet}
                <span className="post__headerSpecial">
                   
                 <br></br>@{props.pseudo}
                </span>
              </h3>
              <div className="Drop_down">
               <MenuIcon fontSize='large' />
              </div> 
            </div>
            <div className="post__headerDescription">
              <p>  {props.tweet} </p>
            </div>
            
          </div>
          <img 
            src={props.image}
 
            alt="profile" style={{width: "100%",height:"23rem",objectFit:"fill"}}
          />
          <div className="post__footer">
            <BsChatDots onClick={() => setShowComment(true)} fontSize="1.4rem"/>
            <BsHeart fontSize="1.4rem"/>
            <AiOutlineRetweet fontSize="1.4rem"/>
            <BsShare fontSize="1.3rem"/>
          </div>
          {showComment ?
          <div className="tweetBox__input"><input value={comment} onChange={(e) => setComment(e.target.value)}  type="text"  placeholder="Ecrivez un commentaire" />  <Commentaire nom="Zaama Nabila" comment="c'est trop beau" date=" posted 1 minute ago" /></div> : <div></div>
         
          }
        </div>
      </div>
    );
  }

;

export default Posts;
