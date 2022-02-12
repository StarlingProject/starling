import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { BsChatDots} from "react-icons/bs";
import { AiOutlineRetweet} from 'react-icons/ai'
import { BsHeart } from "react-icons/bs";
import { BsShare } from "react-icons/bs";
import { BsArrowDownCircle} from "react-icons/bs";
import MenuIcon from '@mui/icons-material/Menu';

function Post({ displayName, username, verified, text, image, avatar }) {
    return (
      <div className="post" >
        <div className="post__avatar">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"/>
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                Atsfaha bila{" "}
                <span className="post__headerSpecial">
                  <VerifiedUserIcon className="post__badge" /> 
                 <br></br>@bilabila
                </span>
              </h3>
              <div className="Drop_down">
               <MenuIcon fontSize='large' />
              </div> 
            </div>
            <div className="post__headerDescription">
              <p> Et Allah n'oublie les efforts de personne.</p>
            </div>
            
          </div>
          <img 
            src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png"
 
            alt="profile" style={{width: "100%",height:"23rem",objectFit:"fill"}}
          />
          <div className="post__footer">
            <BsChatDots fontSize="1.4rem"/>
            <BsHeart fontSize="1.4rem"/>
            <AiOutlineRetweet fontSize="1.4rem"/>
            <BsArrowDownCircle fontSize="1.4rem"/>
            <BsShare fontSize="1.3rem"/>
          </div>
        </div>
      </div>
    );
  }
;

export default Post;
