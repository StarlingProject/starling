import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useParams, useHistory } from "react-router-dom";
import { upload, useAuth, updateDoc, user } from "./Firebase/firebase";
import routeApi from "../api/routes";

toast.configure();
const UploadImg = ({ userData }) => {
  const idUser = useParams();
  const redirection = useHistory();
  const cssProfil = {
    verticalAlign: "middle",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    textAlign: "center",
  };

  const currentUser = useAuth();

  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [photo, setPhoto] = useState(null);
 const  [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    

    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
      setLoading(true);
    }
  };

  const handleClick = async (e) => {
   const token = localStorage.getItem('FBIdToken');
   const result = await routeApi.uploadimage(token , photo);
   if(result.ok){
    getData();
    setLoading(false);
    redirection.push(`/profil/${userData.userId}`); 
   }
    // upload(photo, currentUser);
 
    
  };

  // useEffect(() => {
  //   if (currentUser?.photoURL) {
  //     setPhotoURL(currentUser.photoURL);
  //     updateDoc(user(currentUser.uid), { imageUrl: photoURL }).then(()=>{
  //       //redirection.push(`/profile/${userData.userId}`);
  //       //setLoading(false);
  //      }).catch((error)=>{
  //      console.log(error.message);
  //      });
    
  //   }
  // }, [currentUser,  userData.userId, photoURL, photo]);
  const token = localStorage.getItem("FBIdToken");
  const [user, setUser] = useState(false);

  const getData = async () => {
      const result = await routeApi.getUser(token);
      if (!result.ok) return console.log(result);
  
      setUser(result.data);
    };
    
  
    useEffect(() => {
      getData();
      
    }, []);
  return (
    <div className="col col-lg-12">
      {user && (
        <img src={user.credentials.imageUrl} alt="Avatar" style={cssProfil} />
      )}
      {/* {currentUser && currentUser.photoURL !== null ? (
        <img src={currentUser.photoURL} alt="Avatar" style={cssProfil} />
      ) : (
        <img src={userData.imageUrl} alt="Avatar" style={cssProfil} />
      )} */}
      <input
        type="file"
        id="photo"
        name="photo"
        accept=".jpg, .jpeg, .png"
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <label htmlFor="photo" className="btn_follow1">
        choisir une photo
      </label>
      {
        loading ? (<><button onClick={handleClick} className="btn_follow3" >
        valider
      </button></>) : ('')
      }
    </div>
  );
};
export default UploadImg;





