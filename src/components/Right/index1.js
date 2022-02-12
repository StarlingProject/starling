
import Link from '@material-ui/core/Link'
import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import './style.css'

export function Right () {
    let history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("FBIdToken");
        const refresh_token = localStorage.getItem("RefToken");
        if (!token){
            history.push('/')
        }else{
            let authenticated;
            const token = localStorage.FBIdToken;
            const refresh_token = localStorage.RefToken;
            if(token){
            const decodedToken = jwtDecode(token);
            if((decodedToken.exp * 1000 - Date.now()) < 600000){

                try {
                    // localStorage.removeItem("FBIdToken");
                    // localStorage.removeItem("RefToken");
                    let data = {
                        grant_type:"refresh_token",
                        refresh_token: refresh_token 
                    }
                    axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                        localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`)
                        localStorage.setItem("RefToken", `${res.data.refresh_token}`)
                    })
                    authenticated = false;
                } catch (error) {
                    console.log(error);
                }
            } else {
                authenticated = true;
            }
            }
        }
        
      }, []);

    const linkStyle = {color:'#19A8D9' , marginTop:"5px" , paddingTop:"20px" ,fontWeight:"bold"}

    return (


        <div className="container-suggestion">

            <div className="header-suggestion" >

                <img src="\avatar.jpg" />

                <div className="user-infos-suggestion" >

                    <div className="profil" >
                        <span>Khaldi lamia</span>
                        <p> @lamia_khaldi</p>
                    </div>

                </div>

            </div>

            <div className="header-main-suggestion" >

                <p>Suggestions d'amis</p>

                

            </div>

            <div className="user-suggestion" >

                
                <div className="infos-suggestion" >
                        <img src="\starling.png" />
    
                        <div className="info-suggestion" >
                            <span>Ouachour Amel</span>
                            <p>@Amel_ouachour</p>
                        </div>
    
                        <button className='follow' >Suivre</button>
                 </div>

                 <div className="infos-suggestion" >
                        <img src="\starling.png" />
    
                        <div className="info-suggestion" >
                            <span>Atsfaha nabila</span>
                            <p>@nabila_atsfaha</p>
                        </div>
    
                        <button className='follow' >Suivre</button>
                 </div>

                 <div className="infos-suggestion" >
                        <img src="\starling.png" />
    
                        <div className="info-suggestion" >
                            <span>Chabane karima</span>
                            <p>@karima_chabane</p>
                        </div>
    
                        <button className='follow' >Suivre</button>
                 </div>
                
                 <Link href="#" variant="body2" underline='always'style={linkStyle} >
                    {'voir tout'}
                </Link>

            </div>

            
        </div>
    )
}