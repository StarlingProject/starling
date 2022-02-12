import "./Message.css"
export default function Message({own}) {
    return(
    
    
    <div className={own ? "message own":"message"}>
     <div className="messageTop">
     <img className="messageImg" src="/assets/photo5.jpg" alt="" />
     <p className="messageText">hello this a message</p>
     </div>
     <div className="messageBottom" >1 hour ago</div>  

    </div>

    
    );
}