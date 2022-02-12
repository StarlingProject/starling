import ChatOnline from "../../components/ChatOnline/ChatOnline";
import Conversation from "../../components/Conversation/Conversation"
import Message from "../../components/Message/Message"
import "./Messenger.css"
export default function Messenger() {
    return(

     <>
       <div className="messenger">
          <div className="chatMenu">
               <div className="chatMenuWrapper">
             
          
              <input  placeholder="search for friends" className="chatMenuInput" />
                  <Conversation/> 
                 <Conversation/> 
                 <Conversation/> 
               </div>
           </div>
            
           <div className="chatBox">
               
             <div className="chatBoxTopp">
               <img  className="chatImage" src="/assets/photo4.jpg" alt="" />
               < span className="chatName">dyhia assa</span>
             </div>
            
               <div className="chatBoxWrapper">
             
                   <div className="chatBoxTop">
                   <Message/>
                   <Message own={true}/>
                   <Message/>
                   <Message/>
                  
                   
                   </div>
                   <div className="chatBoxBottom">
                       <textarea className="chatMessageInput" placeholder="write something......"></textarea>
                        <button className="chatSubmitButton">Send</button>
                   </div>
               </div>
           
            </div>
           <div className="chatOnline">
               <div className="chatOnlineWrapper">
                  <ChatOnline/>
                  <ChatOnline/>
                  <ChatOnline/>
                </div>
           </div>
        
       </div>
           




    </>
    
    );
}
