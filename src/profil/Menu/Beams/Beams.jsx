import React, { useState } from "react";

import { dateFrParser } from "../../Date/FormatDateFr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { useAuth } from "../../Firebase/firebase";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { FcLike , FcLikePlaceholder } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { useEffect } from "react";
import routeApi from "../../../api/routes";

const Beams = ({ userData, beams, deleteBeamUser, getComments, friend }) => {
  const currentUser = useAuth();
  const cssProfil = {
    verticalAlign: "middle",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    textAlign: "center",
  };

  const cssProfile = {
    verticalAlign: "middle",
    width: "45px",
    height: "45px",
    marginLeft:"10px",
    borderRadius: "50%",
    textAlign: "center",
  };

  const [seeComment, setSeeComment] = useState(false);
  const [see, setSee] = useState(false);
  const [comments, setComments] = useState([]);
  const [likee, setlikee] = useState([]);
  const [userr , setUserr] = useState();
  const token = localStorage.getItem("FBIdToken");
  

  const getData = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.getUser(token);
    if (!result.ok) return console.log(result);

    setUserr(result.data.credentials.userId);
  };

  useEffect(() => {
    getData();
  }, [userr]);


  if (currentUser && currentUser.uid === userData.userId) {
    if (beams.length !== 0) {
      return (
        <>
          {beams.map((beam, index) => {
            return (
              <div className="col col-sm-12" key={index}>
                <div className="card">
                  <div>
                    <div className="row  mt-3">
                      <div className="col col-lg-11">
                        <div className="row">
                          <div className="col-lg-1">
                            <img
                              src={userData.imageUrl}
                              alt="Photo de profile"
                              style={cssProfile}
                            />
                          </div>
                          <div className="col-lg-auto mt-2">
                            <span
                              style={{ fontSize:"18px",color:"#19A8D9" , marginLeft:"5px"}}
                            >
                              @{userData.pseudo} <br />
                              <span
                                style={{ fontSize:"12px", color:"#696969" ,marginLeft:"5px"}}
                              >
                                A été posté le : {dateFrParser(beam.createdAt)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col col-lg-1">
                        {currentUser === null ? (
                          ""
                        ) : currentUser.uid === userData.userId ? (
                          <RiDeleteBin5Fill
                            className="btn_delete"
                            onClick={() => {
                              deleteBeamUser(beam.id);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        {beam.body && beam.body.length < 320 ? (
                          <p
                            className="card-text  "
                            style={{ textAlign: "justify" }}
                          >
                            {beam.body}
                            <br />
                            <br />
                            {beam.image ? (
                              <div className="">
                                <img
                                  src={beam.image}
                                  className="img-fluid img-thumbnail"
                                  style={{
                                    width: "calc(100% - 20px)",
                                    height: 250,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  alt="photo du post"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        ) : (
                          <p
                            className="card-text"
                            style={{ textAlign: "justify" }}
                          >
                            {beam.body} <br />
                            {beam.image ? (
                              <div >
                                <img
                                  src={beam.image}
                                  className="img-fluid img-thumbnail"
                                  style={{
                                    width: "calc(100% - 20px)",
                                    height: 250,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  alt="photo du post"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    <hr style={{ marginBottom: "5px", marginTop: "12px" }} />
                     <div className="row">
                     <div className="col-lg-4">
                       <span style={{ marginLeft:"2rem"}} >
                      <FcLike style={{fontSize:"20px"}} /> {beam.likeCount}
                    </span>
                    </div>

                  <div className="col-lg-4">
                       <span  >
                      <AiFillMessage style={{ color:"#19A8D9" , fontSize:"20px"}} />
                      {beam.commentCount}
                    </span>
                    
                    {beam.commentCount !== 0 ? (
                      <button
                        onClick={() => {
                          getComments(beam.id, setComments);
                          setSeeComment(!seeComment);
                        }}
                        className="btn btn-default"
                        style={{ marginBottom: "0px", marginTop: "0px" }}
                      >
                        voir commentaire
                        {seeComment === false ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronUp />
                        )}
                      </button>
                    ) : (
                      ""
                    )}

                    {seeComment !== false && beam.commentCount !== 0 ? (
                      <div
                        className=""
                        style={{ width:"600px" ,marginLeft:"-13rem" }}
                      >
                        {comments.map((comment, index) => {
                          if (comment.screamId === beam.id)
                            return (
                              <div
                                key={index}
                                className="card-footer mt-1"
                                style={{
                                  boxShadow:"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                borderRadius: "20px"
                                }}
                              >
                                <div className="row">
                                  <div className="col-lg-auto">
                                    <img
                                      src={comment.userImage}
                                      alt="Avatar"
                                      style={cssProfil}
                                    />
                                  </div>
                                  <div className="col-lg-auto">
                                    <span 
                                     style={{ fontSize:"18px",color:"#19A8D9"}}
                                     >
                                    @{comment.pseudoUser} 
                                    </span>
                                    <br />
                                    <span
                                    style={{fontSize:"12px", color:"#696969" }}
                                    >
                                    A été posté le: {dateFrParser(comment.createdAt)}
                                    </span>
                                   
                                  </div>
                                  <div className="col-lg-auto"></div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <p style={{ textAlign: "justify" }}>
                                      {comment.body}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                       </div>

                       
                       <div className="col-lg-4">
                          <span style={{marginLeft:"9rem"}}>
                          <AiOutlineRetweet style={{color:"#696969" , fontSize:"20px" }} />
                          {beam.repost}
                          </span>
                       </div>
                     </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <div className="row ">
          <div className="col col-lg-12">
            <h1 style={{ color: "#696969" ,fontSize:"12px"  }}>
              vous n'avez rien posté pour le moment!
            </h1>
          </div>
        </div>
      );
    }
  } else {
    if (friend.length !== 0) {
      if (beams.length !== 0) {
        return (
          <>
            {beams.map((beam, index) => {
              // setlikee(beam.like);
              // if(likee.indexOf(userr) > -1 ){
              //   setSee(true);
              // }else{
              //   setSee(false);
              // }
            return (
              <div className="col col-sm-12" key={index}>
                <div className="card">
                  <div>
                    <div className="row  mt-3">
                      <div className="col col-lg-11">
                        <div className="row">
                          <div className="col-lg-1">
                            <img
                              src={userData.imageUrl}
                              alt="Photo de profile"
                              style={cssProfile}
                            />
                          </div>
                          <div className="col-lg-auto mt-2">
                            <span
                              style={{ fontSize:"18px",color:"#19A8D9",marginLeft:"5px"}}
                            >
                              @{userData.pseudo}  </span><br />
                              <span
                                style={{ fontSize:"12px", color:"#696969",marginLeft:"5px" }}
                              >
                                A été posté le : {dateFrParser(beam.createdAt)}
                              </span>
                           
                          </div>
                        </div>
                      </div>

                      <div className="col col-lg-1">
                        {currentUser === null ? (
                          ""
                        ) : currentUser.uid === userData.userId ? (
                          <RiDeleteBin5Fill
                            className="btn_delete"
                            onClick={() => {
                              deleteBeamUser(beam.id);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        {beam.body && beam.body.length < 320 ? (
                          <p
                            className="card-text  "
                            style={{ textAlign: "justify" }}
                          >
                            {beam.body}
                            <br />
                            <br />
                            {beam.image ? (
                              <div className="">
                                <img
                                  src={beam.image}
                                  className="img-fluid img-thumbnail"
                                  style={{
                                    width: "calc(100% - 20px)",
                                    height: 250,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  alt="photo du post"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        ) : (
                          <p
                            className="card-text"
                            style={{ textAlign: "justify" }}
                          >
                            {beam.body} <br />
                            {beam.image ? (
                              <div className="">
                                <img
                                  src={beam.image}
                                  className="img-fluid img-thumbnail"
                                  style={{
                                    width: "calc(100% - 20px)",
                                    height: 250,
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  alt="photo du post"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    <hr style={{ marginBottom: "5px", marginTop: "12px" }} />
                     <div className="row">
                     <div className="col-lg-4">
                       
                        <span>
                        <FcLike style={{fontSize:"20px"}} /> {beam.likeCount}
                        </span>
                       
                       
                    </div>
                  <div className="col-lg-4">
                       <span >
                      <AiFillMessage style={{ color:"#19A8D9" , fontSize:"20px"  }} />
                      {beam.commentCount}
                    </span>
                    
                    {beam.commentCount !== 0 ? (
                      <button
                        onClick={() => {
                          getComments(beam.id, setComments);
                          setSeeComment(!seeComment);
                        }}
                        className="btn btn-default"
                        style={{ marginBottom: "0px", marginTop: "0px" }}
                      >
                        voir commentaire
                        {seeComment === false ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronUp />
                        )}
                      </button>
                    ) : (
                      ""
                    )}

                    {seeComment !== false && beam.commentCount !== 0 ? (
                      <div
                        className=""
                        style={{ width:"600px" ,marginLeft:"-13rem"}}
                      >
                        {comments.map((comment, index) => {
                          if (comment.screamId === beam.id)
                            return (
                              <div
                                key={index}
                                className="card-footer mt-1"
                                style={{
                                  boxShadow:"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                borderRadius: "20px"
                                }}
                              >
                                <div className="row">
                                  <div className="col-lg-auto">
                                    <img
                                      src={comment.userImage}
                                      alt="Avatar"
                                      style={cssProfil}
                                    />
                                  </div>
                                  <div className="col-lg-auto">
                                  <span style={{ fontSize:"18px",color:"#19A8D9" }}>
                                    @{comment.pseudoUser} </span><br />
                                   <span style={{
                                        fontSize:"12px", color:"#696969"
                                      }}>
                                        A été posté: {dateFrParser(comment.createdAt)}</span> 
                                  </div>
                                  <div className="col-lg-auto"></div>
                                </div>
                                <div className="row">
                                  <div className="col-lg-12">
                                    <p style={{ textAlign: "justify" }}>
                                      {comment.body}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                        })}
                      </div>
                    ) : (
                      ""
                    )}
                       </div>

                       
                       <div className="col-lg-4">
                       <span style={{marginLeft:"9rem"}}>
                      <AiOutlineRetweet style={{color:"#696969" , fontSize:"20px"}}/>
                      {beam.repost}
                    </span>
                       </div>

                     </div>
                  

                  </div>
                  

                 



                </div>

                
               


              </div>
            );
          })}
          </>
        );
      } else {
        return (
          <div className="row ">
            <div className="col col-lg-12">
              <h1 style={{  color: "#696969" , fontSize:"12px"}}>
                Cette personne n'a rien posté pour le moment!
              </h1>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="row ">
          <div className="col col-lg-12">
            <h1 style={{  color: "#696969" , fontSize:"12px"}}>
              Veuillez vous abonnez pour voir ce contenu.
            </h1>
          </div>
        </div>
      );
    }
  }
};

export default Beams;





// import React, { useState } from "react";

// import { dateFrParser } from "../../Date/FormatDateFr";
// import { RiDeleteBin5Fill } from "react-icons/ri";
// import { AiFillMessage } from "react-icons/ai";
// import { useAuth } from "../../Firebase/firebase";
// import { FiChevronDown } from "react-icons/fi";
// import { FiChevronUp } from "react-icons/fi";
// import { FcLike } from "react-icons/fc";
// import { AiOutlineRetweet } from "react-icons/ai";

// const Beams = ({ userData, beams, deleteBeamUser, getComments, friend }) => {
//   const currentUser = useAuth();
//   const cssProfil = {
//     verticalAlign: "middle",
//     width: "45px",
//     height: "45px",
//     borderRadius: "50%",
//     textAlign: "center",
//   };

//   const cssProfile = {
//     verticalAlign: "middle",
//     width: "45px",
//     height: "45px",
//     marginLeft:"10px",
//     borderRadius: "50%",
//     textAlign: "center",
//   };

//   const [seeComment, setSeeComment] = useState(false);
//   const [comments, setComments] = useState([]);

//   if (currentUser && currentUser.uid === userData.userId) {
//     if (beams.length !== 0) {
//       return (
//         <>
//           {beams.map((beam, index) => {
//             return (
//               <div className="col col-sm-12" key={index}>
//                 <div className="card">
//                   <div>
//                     <div className="row  mt-3">
//                       <div className="col col-lg-11">
//                         <div className="row">
//                           <div className="col-lg-1">
//                             <img
//                               src={userData.imageUrl}
//                               alt="Photo de profile"
//                               style={cssProfile}
//                             />
//                           </div>
//                           <div className="col-lg-auto mt-2">
//                             <span
//                               style={{ fontSize:"18px",color:"#19A8D9" , marginLeft:"5px"}}
//                             >
//                               @{userData.pseudo} <br />
//                               <span
//                                 style={{ fontSize:"12px", color:"#696969" ,marginLeft:"5px"}}
//                               >
//                                 A été posté le : {dateFrParser(beam.createdAt)}
//                               </span>
//                             </span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col col-lg-1">
//                         {currentUser === null ? (
//                           ""
//                         ) : currentUser.uid === userData.userId ? (
//                           <RiDeleteBin5Fill
//                             className="btn_delete"
//                             onClick={() => {
//                               deleteBeamUser(beam.id);
//                             }}
//                           />
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-lg-12">
//                         {beam.body && beam.body.length < 320 ? (
//                           <p
//                             className="card-text  "
//                             style={{ textAlign: "justify" }}
//                           >
//                             {beam.body}
//                             <br />
//                             <br />
//                             {beam.image ? (
//                               <div className="text-center">
//                                 <img
//                                   src={beam.image}
//                                   className="img-fluid img-thumbnail"
//                                   style={{
//                                     width: "calc(100% - 20px)",
//                                     height: 250,
//                                     objectFit: "cover",
//                                     borderRadius: 10,
//                                   }}
//                                   alt="photo du post"
//                                 />
//                               </div>
//                             ) : (
//                               ""
//                             )}
//                           </p>
//                         ) : (
//                           <p
//                             className="card-text"
//                             style={{ textAlign: "justify" }}
//                           >
//                             {beam.body} <br />
//                             {beam.image ? (
//                               <div className="text-center">
//                                 <img
//                                   src={beam.image}
//                                   className="img-fluid img-thumbnail"
//                                   style={{
//                                     width: "calc(100% - 20px)",
//                                     height: 250,
//                                     objectFit: "cover",
//                                     borderRadius: 10,
//                                   }}
//                                   alt="photo du post"
//                                 />
//                               </div>
//                             ) : (
//                               ""
//                             )}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <hr style={{ marginBottom: "5px", marginTop: "12px" }} />
//                      <div className="row">
//                      <div className="col-lg-4">
//                        <span style={{ marginLeft:"2rem"}} >
//                       <FcLike style={{fontSize:"20px"}} /> {beam.likeCount}
//                     </span>
//                     </div>

//                   <div className="col-lg-4">
//                        <span  >
//                       <AiFillMessage style={{ color:"#19A8D9" , fontSize:"20px"}} />
//                       {beam.commentCount}
//                     </span>
                    
//                     {beam.commentCount !== 0 ? (
//                       <button
//                         onClick={() => {
//                           getComments(beam.id, setComments);
//                           setSeeComment(!seeComment);
//                         }}
//                         className="btn btn-default"
//                         style={{ marginBottom: "0px", marginTop: "0px" }}
//                       >
//                         voir commentaire
//                         {seeComment === false ? (
//                           <FiChevronDown />
//                         ) : (
//                           <FiChevronUp />
//                         )}
//                       </button>
//                     ) : (
//                       ""
//                     )}

//                     {seeComment !== false && beam.commentCount !== 0 ? (
//                       <div
//                         className=""
//                         style={{ width:"600px" ,marginLeft:"-13rem" }}
//                       >
//                         {comments.map((comment, index) => {
//                           if (comment.screamId === beam.id)
//                             return (
//                               <div
//                                 key={index}
//                                 className="card-footer mt-1"
//                                 style={{
//                                   boxShadow:"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
//                                 borderRadius: "20px"
//                                 }}
//                               >
//                                 <div className="row">
//                                   <div className="col-lg-auto">
//                                     <img
//                                       src={comment.userImage}
//                                       alt="Avatar"
//                                       style={cssProfil}
//                                     />
//                                   </div>
//                                   <div className="col-lg-auto">
//                                     <span 
//                                      style={{ fontSize:"18px",color:"#19A8D9"}}
//                                      >
//                                     @{comment.pseudoUser} 
//                                     </span>
//                                     <br />
//                                     <span
//                                     style={{fontSize:"12px", color:"#696969" }}
//                                     >
//                                     A été posté le: {dateFrParser(comment.createdAt)}
//                                     </span>
                                   
//                                   </div>
//                                   <div className="col-lg-auto"></div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-lg-12">
//                                     <p style={{ textAlign: "justify" }}>
//                                       {comment.body}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                         })}
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                        </div>

                       
//                        <div className="col-lg-4">
//                           <span style={{marginLeft:"9rem"}}>
//                           <AiOutlineRetweet style={{color:"#696969" , fontSize:"20px" }} />
//                           {beam.repost}
//                           </span>
//                        </div>
//                      </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </>
//       );
//     } else {
//       return (
//         <div className="row text-center">
//           <div className="col col-lg-12">
//             <h1 style={{ color: "#696969" ,fontSize:"12px"  }}>
//               vous n'avez rien posté pour le moment!
//             </h1>
//           </div>
//         </div>
//       );
//     }
//   } else {
//     if (friend.length !== 0) {
//       if (beams.length !== 0) {
//         return (
//           <>
//             {beams.map((beam, index) => {
//             return (
//               <div className="col col-sm-12" key={index}>
//                 <div className="card">
//                   <div>
//                     <div className="row  mt-3">
//                       <div className="col col-lg-11">
//                         <div className="row">
//                           <div className="col-lg-1">
//                             <img
//                               src={userData.imageUrl}
//                               alt="Photo de profile"
//                               style={cssProfile}
//                             />
//                           </div>
//                           <div className="col-lg-auto mt-2">
//                             <span
//                               style={{ fontSize:"18px",color:"#19A8D9",marginLeft:"5px"}}
//                             >
//                               @{userData.pseudo}  </span><br />
//                               <span
//                                 style={{ fontSize:"12px", color:"#696969",marginLeft:"5px" }}
//                               >
//                                 A été posté le : {dateFrParser(beam.createdAt)}
//                               </span>
                           
//                           </div>
//                         </div>
//                       </div>

//                       <div className="col col-lg-1">
//                         {currentUser === null ? (
//                           ""
//                         ) : currentUser.uid === userData.userId ? (
//                           <RiDeleteBin5Fill
//                             className="btn_delete"
//                             onClick={() => {
//                               deleteBeamUser(beam.id);
//                             }}
//                           />
//                         ) : (
//                           ""
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <div className="row">
//                       <div className="col-lg-12">
//                         {beam.body && beam.body.length < 320 ? (
//                           <p
//                             className="card-text  "
//                             style={{ textAlign: "justify" }}
//                           >
//                             {beam.body}
//                             <br />
//                             <br />
//                             {beam.image ? (
//                               <div className="text-center">
//                                 <img
//                                   src={beam.image}
//                                   className="img-fluid img-thumbnail"
//                                   style={{
//                                     width: "calc(100% - 20px)",
//                                     height: 250,
//                                     objectFit: "cover",
//                                     borderRadius: 10,
//                                   }}
//                                   alt="photo du post"
//                                 />
//                               </div>
//                             ) : (
//                               ""
//                             )}
//                           </p>
//                         ) : (
//                           <p
//                             className="card-text"
//                             style={{ textAlign: "justify" }}
//                           >
//                             {beam.body} <br />
//                             {beam.image ? (
//                               <div className="text-center">
//                                 <img
//                                   src={beam.image}
//                                   className="img-fluid img-thumbnail"
//                                   style={{
//                                     width: "calc(100% - 20px)",
//                                     height: 250,
//                                     objectFit: "cover",
//                                     borderRadius: 10,
//                                   }}
//                                   alt="photo du post"
//                                 />
//                               </div>
//                             ) : (
//                               ""
//                             )}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <hr style={{ marginBottom: "5px", marginTop: "12px" }} />
//                      <div className="row">
//                      <div className="col-lg-4"><span>
//                       <FcLike style={{fontSize:"20px"}} /> {beam.likeCount}
//                     </span></div>
//                   <div className="col-lg-4">
//                        <span >
//                       <AiFillMessage style={{ color:"#19A8D9" , fontSize:"20px"  }} />
//                       {beam.commentCount}
//                     </span>
                    
//                     {beam.commentCount !== 0 ? (
//                       <button
//                         onClick={() => {
//                           getComments(beam.id, setComments);
//                           setSeeComment(!seeComment);
//                         }}
//                         className="btn btn-default"
//                         style={{ marginBottom: "0px", marginTop: "0px" }}
//                       >
//                         voir commentaire
//                         {seeComment === false ? (
//                           <FiChevronDown />
//                         ) : (
//                           <FiChevronUp />
//                         )}
//                       </button>
//                     ) : (
//                       ""
//                     )}

//                     {seeComment !== false && beam.commentCount !== 0 ? (
//                       <div
//                         className=""
//                         style={{ width:"600px" ,marginLeft:"-13rem"}}
//                       >
//                         {comments.map((comment, index) => {
//                           if (comment.screamId === beam.id)
//                             return (
//                               <div
//                                 key={index}
//                                 className="card-footer mt-1"
//                                 style={{
//                                   boxShadow:"rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
//                                 borderRadius: "20px"
//                                 }}
//                               >
//                                 <div className="row">
//                                   <div className="col-lg-auto">
//                                     <img
//                                       src={comment.userImage}
//                                       alt="Avatar"
//                                       style={cssProfil}
//                                     />
//                                   </div>
//                                   <div className="col-lg-auto">
//                                   <span style={{ fontSize:"18px",color:"#19A8D9" }}>
//                                     @{comment.pseudoUser} </span><br />
//                                    <span style={{
//                                         fontSize:"12px", color:"#696969"
//                                       }}>
//                                         A été posté: {dateFrParser(comment.createdAt)}</span> 
//                                   </div>
//                                   <div className="col-lg-auto"></div>
//                                 </div>
//                                 <div className="row">
//                                   <div className="col-lg-12">
//                                     <p style={{ textAlign: "justify" }}>
//                                       {comment.body}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             );
//                         })}
//                       </div>
//                     ) : (
//                       ""
//                     )}
//                        </div>

                       
//                        <div className="col-lg-4">
//                        <span style={{marginLeft:"9rem"}}>
//                       <AiOutlineRetweet style={{color:"#696969" , fontSize:"20px"}}/>
//                       {beam.repost}
//                     </span>
//                        </div>

//                      </div>
                  

//                   </div>
                  

                 



//                 </div>

                
               


//               </div>
//             );
//           })}
//           </>
//         );
//       } else {
//         return (
//           <div className="row text-center">
//             <div className="col col-lg-12">
//               <h1 style={{  color: "#696969" , fontSize:"12px"}}>
//                 Cette personne n'a rien posté pour le moment!
//               </h1>
//             </div>
//           </div>
//         );
//       }
//     } else {
//       return (
//         <div className="row text-center">
//           <div className="col col-lg-12">
//             <h1 style={{  color: "#696969" , fontSize:"12px"}}>
//               Veuillez vous abonnez pour voir ce contenu.
//             </h1>
//           </div>
//         </div>
//       );
//     }
//   }
// };

// export default Beams;