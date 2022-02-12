import React from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { FaRegCalendarAlt} from 'react-icons/fa'
import {BsCardImage,  BsFillEmojiSmileFill} from 'react-icons/bs'
import {useRef, useState} from "react";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";



function TweetBox() {
  const [tweetBox, SetTweetBox] = useState("");
  //const [selectedFile, setSelectedFile]= useState(null);
  const [tweet, setTweet] = useState('')
  const [showEmojis, setShowEmojis]= useState(false);
  const filePickerRef = useRef(null);

  const addImagepost = () => {};

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" +el));
    let emoji = String.fromCodePoint(...codesArray);
    setTweet(tweet + emoji);
  };

  console.log(tweet)
  const TweetHandler = () => {
    if (tweet) {
      alert("sauvgarder!")
    } else {
      alert('veuillez remplir le champs!')
    }
  }

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <textarea  value={tweet}
             onChange={(e) => setTweet(e.target.value)} placeholder="Everyone can reply...?"
            type="text"
            rows="2"
          />
        </div>
     
            
         

        <br></br>
        <div className="Btns">
        <div className="Icon">
          <div className="Btns_icon" onClick={() => filePickerRef. current.click()}>
            <BsCardImage fontSize="1.5rem" color="#00BFFF"/>
            <input 
             type="file"
             hidden
              onChange={addImagepost} 
              ref={filePickerRef}/>

          </div>
          <div className="Btns_icon">
            <FaRegCalendarAlt fontSize="1.5rem" color="#00BFFF"/>
          </div>
          <div className="Btns_icon" onClick={() => setShowEmojis (!showEmojis)} >
            <BsFillEmojiSmileFill fontSize="1.5rem" color="#00BFFF"/>
          </div>
          {showEmojis &&(
            <Picker
              onSelect= {addEmoji}
              style={{
                position: "absolute",
                marginTop: "40px",
                marginLeft: 100,
                maxWidth: "250px",
                borderRadius:"20px",
                cursor:"pointer",
              }}
              theme="clear"
              
            />
          )} 

        </div>
        </div>

        <Button
          className="tweetBox__tweetButton"
         onClick={TweetHandler}
        >
          Tweet all
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;