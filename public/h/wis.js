import '../App.css';
import Left from './Left';
import SignInOutContainer from './Right'




function Appl() {
  return (
    <div className="App">
     <div className="Main">

       <div className="Left_Sidebar_Area">
         <Left/>
       </div>

       <div className="Right_Sidebar_Area">
          <SignInOutContainer/>
       </div>
     </div>
    </div>
  );
}

export default Appl;