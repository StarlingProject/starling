import React, {useState, useRef} from "react";
import Attachment from "../svg/Attachment";
import Document from "../svg/Document";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";  


const MessageForm = ({ handleSubmit_2, text, setText, setImg, setFile}) => {
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);
  
   const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  return (
    <div className="form_container"> 
    <form className="message_form" >
     <div className="pic_doc">
        <div >
          <label htmlFor="img">
            <Attachment />
          </label>
          <input
            onChange={(e) => setImg(e.target.files[0])}
            type="file"
            id="img"
            accept="image/*"
            style={{ display: "none" }}
          />
       </div>
       <div>
         <label htmlFor="doce" style={{marginLeft: '5px'}}> <Document /> </label>
         <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="doce"
            accept="file/*"
            style={{ display: "none", borderColor:"#696969" }}
          />
       </div>  
     </div>  


      <div className="picker_container" style={{transform: 'translate(25px,5px)', position: "relative", width: "100%", color:"black"}}>
        <input className="ecrire_msg"
          className="nit"
          type="text"
          role="textbox"
          multiline
          contenteditable="true"
          spellcheck="true"
          data-lexical-editor="true"
          placeholder="Entrez un message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          
        /> 
        <div
          className="Btns_icon"
          
          onClick={() => setShowEmojis(!showEmojis)}
        >
          <BsFillEmojiSmileFill fontSize="1.5rem" color="#19A8D9" />
        </div>
        {showEmojis && (
              <Picker
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: "-500px",
                  marginLeft: "-90px",
                }}
                theme="clear"
              />
            )}
     </div>
      <div>
        <button className="btn_form" onClick={handleSubmit_2}> <IoMdSend fontSize="1.5rem" /> </button>
      </div>
    </form>
   </div> 
  );
};

export default MessageForm;


