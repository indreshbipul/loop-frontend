import { useEffect, useState } from "react";
import Nav from "./components/Nav"
import Routing from "./routes/routing"

import UserSession from "./utils/UserSession";
import AuthContext from "./contexts/authSessionContext";

function App() {

  const [userSessionData, setUserSessionData] = useState(null);
  const [refreshSession, setRefreshSession] = useState(false);

  useEffect(() =>{
    const fetchUserSessionData = async ()=>{
      await UserSession().then((data) => {
        setUserSessionData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
    }
    fetchUserSessionData()
  },[refreshSession])
 

  return (
      <AuthContext.Provider value={{ userData : userSessionData, setUserData : setUserSessionData, refresh : setRefreshSession }}>          
            <div className=" bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] h-full w-full border-box min-h-screen">
              <Nav /> 
              <div className='pt-20'>
                <Routing /> 
              </div>   
            </div>            
      </AuthContext.Provider>
  )
}

export default App;