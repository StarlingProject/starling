import React, { useState } from "react";
import { dateFrParser } from "../../Date/FormatDateFr";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Firebase/firebase";
import { FcLike } from "react-icons/fc";
import { AiFillMessage } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FiChevronUp } from "react-icons/fi";

import { MdBlockFlipped } from "react-icons/md";

const ReBeams = ({
  userData,
  reBeams,
  deleteReBeamUser,
  getReComments,
  friend,
  bloques,
}) => {
  const currentUser = useAuth();
  const redirection = useHistory();

  const cssProfil = {
    verticalAlign: "middle",
    width: "45px",
    height: "45px",
    marginLeft:"10px",
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
  const [reComments, setReComments] = useState([]);

  if (currentUser && currentUser.uid === userData.userId) {
    if (reBeams.length !== 0) {
      return (
        <>
          {reBeams.map((reBeam, index) => {
            return (
              <div className="col col-sm-12" key={index}>
                <div className="card">
                  <div>
                    <div className="row mt-3">
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
                            <span style={{fontSize:"18px" , color:"#19A8D9",marginLeft:"5px" }}>
                              @{userData.pseudo} <br />
                              <span
                                style={{fontSize:"12px" ,color:"#696969" ,marginLeft:"5px" }}
                              >
                                A été reposté le :
                                {dateFrParser(reBeam.createdAt)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      {currentUser === null ? (
                        ""
                      ) : currentUser.uid === userData.userId ? (
                        <div className="col col-lg-1">
                          <RiDeleteBin5Fill
                            className="btn_delete"
                            onClick={() => {
                              deleteReBeamUser(reBeam.id);
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="card-body">
                    <span
                      style={{
                        display: "inline-block",
                        marginBottom: "0px",
                        fontSize: "15px",
                        color:"#696969"
                      }}
                    >
                      <AiOutlineRetweet style={{ color:"#696969"}} /> Vous avez
                      reposté
                    </span>
                    <div className="card">
                      <div>
                        <div className="row mt-3">
                          <div className="col col-lg-10">
                            <div className="row">
                              <div className="col-lg-1">
                                <img
                                  src={reBeam.reuserImage}
                                  alt="Photo de profile"
                                  style={cssProfile}
                                />
                              </div>
                              <div className="col-lg-auto mt-2">
                                <span style={{ fontSize: "18px", color:"#19A8D9",marginLeft:"12px" }}>
                                  @{reBeam.repseudo} <br />
                                  <span
                                    style={{
                                      fontSize:"12px" ,color:"#696969" , marginLeft:"12px"
                                    }}
                                  >
                                    A été posté le :
                                    {dateFrParser(reBeam.recreatedAt)}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col col-lg-2"
                            style={{ textAlign: "right" }}
                          >
                            <div className="dropdown">
                              <button
                                className="btn btn-default"
                                id="dropdownMenu2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <FiMoreHorizontal className="btn_fi" />
                              </button>

                              {bloques.includes(reBeam.reuserid) ? (
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenu2"
                                >
                                  <li>
                                    <button className="dropdown-item">
                                      <MdBlockFlipped
                                        style={{ color: "rgb(18, 204, 211)" }}
                                      />
                                      Utilisateur bloqué
                                    </button>
                                  </li>
                                </ul>
                              ) : (
                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenu2"
                                >
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        redirection.push(
                                          `/profil/${reBeam.reuserid}`
                                        );
                                      }}
                                    >
                                      <BsFillPersonPlusFill
                                        style={{ color: "rgb(18, 204, 211)" }}
                                      />
                                      Voir profil
                                    </button>
                                  </li>
                                </ul>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12">
                            {reBeam.rebody && reBeam.rebody.length < 320 ? (
                              <p
                                className="card-text"
                                style={{ textAlign: "justify" }}
                              >
                                {reBeam.rebody}
                                <br />
                                <br />
                                {reBeam.reimage ? (
                                  <div className="text-center">
                                    <img
                                      src={reBeam.reimage}
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
                                style={{
                                  textAlign: "justify",
                                }}
                              >
                                {reBeam.rebody} <br />
                                {reBeam.reimage ? (
                                  <div className="text-center">
                                    <img
                                      src={reBeam.reimage}
                                      className="img-fluid img-thumbnail"
                                      style={{
                                        width: "calc(100% - 20px)",
                                        height: 250,
                                        objectFit: "cover",
                                        borderRadius: 10,
                                      }}
                                      alt="photo du repost"
                                    />
                                  </div>
                                ) : (
                                  ""
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr style={{ marginBottom: "7px", marginTop: "12px" }} />

                    <div className="row">
                    <div className="col-lg-6">
                        <span style={{ marginLeft: "7rem" }} >
                          <FcLike style={{fontSize:"20px"}}  /> {reBeam.likeCount}
                        </span>
                      </div>
                      <div className="col-lg-6">
                        <span style={{ marginLeft: "7rem" }}>
                          <AiFillMessage style={{color:"#19A8D9" , fontSize:"20px"}}/>
                          {reBeam.commentCount}
                        </span>

                        {reBeam.commentCount !== 0 ? (
                          <button
                            onClick={() => {
                              getReComments(reBeam.id, setReComments);
                              setSeeComment(!seeComment);
                            }}
                            className="btn btn-default"
                            style={{ marginBottom: "0px", marginTop: "0px" }}
                          >
                            Voir commentaire
                            {seeComment === false ? (
                              <FiChevronDown />
                            ) : (
                              <FiChevronUp />
                            )}
                          </button>
                        ) : (
                          ""
                        )}

                        {seeComment !== false && reBeam.commentCount !== 0 ? (
                          <div
                            className=""
                            style={{ width:"600px" ,marginLeft:"-21rem" }}
                          >
                            {reComments.map((reComment, index) => {
                              if (reComment.screamId === reBeam.id)
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
                                          src={reComment.userImage}
                                          alt="Avatar"
                                          style={cssProfil}
                                        />
                                      </div>
                                      <div className="col-lg-auto">
                                        <span style={{ fontSize:"18px",color:"#19A8D9",marginLeft:"5px"}}>
                                        @{reComment.pseudoUser}
                                        </span>
                                         <br />
                                        <span
                                         style={{ fontSize:"12px", color:"#696969",marginLeft:"5px" }}
                                        >
                                         {dateFrParser(reComment.createdAt)}
                                
                                         </span>

                                      </div>
                                      <div className="col-lg-auto"></div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-12">
                                        <p style={{ textAlign: "justify" }}>
                                          {reComment.body}
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
        <div className="row text-center">
          <div className="col col-lg-12">
            <h1 style={{ color: "#696969" , fontSize:"12px"}}>
              Vous n'avez rien reposté pour le moment
            </h1>
          </div>
        </div>
      );
    }
  } else {
    if (friend.length !== 0) {
      if (reBeams.length !== 0) {
        return (
          <>
            {reBeams.map((reBeam, index) => {
              return (
                <div className="col col-sm-12" key={index}>
                  <div className="card">
                    <div>
                      <div className="row mt-3">
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
                              <span style={{ fontSize:"18px",color:"#19A8D9",marginLeft:"5px" }}>
                                @{userData.pseudo} <br />
                                <span
                                  style={{ fontSize:"12px", color:"#696969",marginLeft:"5px"}}
                                >
                                  A été reposté le :
                                  {dateFrParser(reBeam.createdAt)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        {currentUser === null ? (
                          ""
                        ) : currentUser.uid === userData.userId ? (
                          <div className="col col-lg-1">
                            <RiDeleteBin5Fill
                              className="btn_delete"
                              onClick={() => {
                                deleteReBeamUser(reBeam.id);
                              }}
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <span
                        style={{
                          display: "inline-block",
                          marginBottom: "0px",
                          fontSize: "15px",
                          color:"#696969"
                        }}
                      >
                        <AiOutlineRetweet style={{ color: "#696969" }} /> Vous
                        avez reposté
                      </span>
                      <div className="card">
                        <div>
                          <div className="row mt-3">
                            <div className="col col-lg-10">
                              <div className="row">
                                <div className="col-lg-1">
                                  <img
                                    src={reBeam.reuserImage}
                                    alt="Photo de profile"
                                    style={cssProfile}
                                  />
                                </div>
                                <div className="col-lg-auto mt-2">
                                  <span style={{ fontSize:"18px",color:"#19A8D9" ,marginLeft:"12px"}}>
                                    @{reBeam.repseudo} <br />
                                    <span
                                      style={{
                                        fontSize:"12px", color:"#696969",marginLeft:"12px"
                                      }}
                                    >
                                      A été posté le :
                                      {dateFrParser(reBeam.recreatedAt)}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col col-lg-2"
                              style={{ textAlign: "right" }}
                            >
                              <div className="dropdown">
                                <button
                                  className="btn btn-default"
                                  id="dropdownMenu2"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <FiMoreHorizontal className="btn_fi" />
                                </button>

                                {bloques.includes(reBeam.reuserid) ? (
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenu2"
                                  >
                                    <li>
                                      <button className="dropdown-item">
                                        <MdBlockFlipped
                                          style={{ color: "rgb(18, 204, 211)" }}
                                        />
                                        Utilisateur bloqué
                                      </button>
                                    </li>
                                  </ul>
                                ) : (
                                  <ul
                                    className="dropdown-menu"
                                    aria-labelledby="dropdownMenu2"
                                  >
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => {
                                          redirection.push(
                                            `/profil/${reBeam.reuserid}`
                                          );
                                        }}
                                      >
                                        <BsFillPersonPlusFill
                                          style={{ color: "rgb(18, 204, 211)" }}
                                        />
                                        Voir profil
                                      </button>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-lg-12">
                              {reBeam.rebody && reBeam.rebody.length < 320 ? (
                                <p
                                  className="card-text"
                                  style={{ textAlign: "justify" }}
                                >
                                  {reBeam.rebody}
                                  <br />
                                  <br />
                                  {reBeam.reimage ? (
                                    <div className="text-center">
                                      <img
                                        src={reBeam.reimage}
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
                                  style={{
                                    textAlign: "justify",
                                  }}
                                >
                                  {reBeam.rebody} <br />
                                  {reBeam.reimage ? (
                                    <div className="text-center">
                                      <img
                                        src={reBeam.reimage}
                                        className="img-fluid img-thumbnail"
                                        style={{
                                          width: "calc(100% - 20px)",
                                          height: 250,
                                          objectFit: "cover",
                                          borderRadius: 10,
                                        }}
                                        alt="photo du repost"
                                      />
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr style={{ marginBottom: "7px", marginTop: "12px" }} />

                      <div className="row">
                      <div className="col-lg-6">
                          <span style={{ marginLeft: "7rem" }}>
                            <FcLike style={{   fontSize:"20px"   }} /> {reBeam.likeCount}
                          </span>
                        </div>
                        <div className="col-lg-6">
                          <span style={{ marginLeft: "7rem" }}>
                            <AiFillMessage
                              style={{  color:"#19A8D9" , fontSize:"20px"   }}
                            />
                            {reBeam.commentCount}
                          </span>

                          {reBeam.commentCount !== 0 ? (
                            <button
                              onClick={() => {
                                getReComments(reBeam.id, setReComments);
                                setSeeComment(!seeComment);
                              }}
                              className="btn btn-default"
                              style={{ marginBottom: "0px", marginTop: "0px" }}
                            >
                              Voir commentaire
                              {seeComment === false ? (
                                <FiChevronDown />
                              ) : (
                                <FiChevronUp />
                              )}
                            </button>
                          ) : (
                            ""
                          )}

                          {seeComment !== false && reBeam.commentCount !== 0 ? (
                            <div
                              className=""
                              style={{ width:"600px" ,marginLeft:"-21rem"  }}
                            >
                              {reComments.map((reComment, index) => {
                                if (reComment.screamId === reBeam.id)
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
                                            src={reComment.userImage}
                                            alt="Avatar"
                                            style={cssProfil}
                                          />
                                        </div>
                                        <div className="col-lg-auto">
                                        <span style={{ fontSize:"18px",color:"#19A8D9" }}>
                                          @{reComment.pseudoUser} </span><br />
                                          <span style={{
                                        fontSize:"12px", color:"#696969"
                                      }}>
                                         A été posté le: {dateFrParser(reComment.createdAt)}
                                          </span>
                                          
                                        </div>
                                        <div className="col-lg-auto"></div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <p style={{ textAlign: "justify" }}>
                                            {reComment.body}
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
          <div className="row text-center">
            <div className="col col-lg-12">
              <h1 style={{ color: "#696969" , fontSize:"12px" }}>
                Cette personne n'a rien reposté pour le moment!
              </h1>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="row text-center">
          <div className="col col-lg-12">
            <h1 style={{ color: "#696969" , fontSize:"12px" }}>
              Veuillez vous abonnez pour voir ce contenu.
            </h1>
          </div>
        </div>
      );
    }
  }
};

export default ReBeams;
