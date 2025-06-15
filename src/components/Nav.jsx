import { Link, NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


//Local Imports
import authService from "../services/authServices";
import useAuthHook from "../hooks/authHook";
import logo from '.././assets/logoDark.png'; // Adjust the path as necessary



function Nav() {
    
    const {userData, setUserData } = useAuthHook(); 
    const [userDbData, setUserDbData] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        if(userData?.user?._id){
            authService.activeUserData(userData.user._id)
            .then((data) => {
                setUserDbData(data);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
        }
    },[userData])
    // if(!userData || !userDbData){
    //     return null;
    // }

    const handleLogout = () => {
        authService.userLogout()
            .then(() => {
                console.log("User logged out successfully");
                setUserData({ isLoggedIn: false, user: {} });
                setUserDbData(null); // Clear userDbData on logout
                navigate('/signin'); // Redirect to sign-in page after logout
            })
            .catch((error) => {
                console.error("Error logging out:", error);
            });
    };
    

  return (
    <>
        <div className=" z-50 fixed bg-black h-20 w-full flex justify-between items-center px-2 sm:px-14">
            <div className='h-20  flex items-center justify-center'>
                <NavLink to="/" className="flex items-center">
                    <img src={logo} alt="logo" className='h-16 min-w-9' />
                </ NavLink>
            </div>
            <div className="flex gap-4 md:gap-10 items-center justify-center">
                <NavLink to="/" className="text-white hover:text-gray-400 sm:block hidden">
                    <div className="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        width="25" 
                        height="25" 
                        viewBox="0 0 50 50" 
                        fill="currentColor">
                            <path d="M25,1.05078c-0.2175,0 -0.43414,0.06898 -0.61914,0.20898l-23,17.95117c-0.43,0.34 -0.50992,0.9682 -0.16992,1.4082c0.34,0.43 0.9682,0.50992 1.4082,0.16992l1.38086,-1.07812v26.28906c0,0.55 0.45,1 1,1h14v-18h12v18h14c0.55,0 1,-0.45 1,-1v-26.28906l1.38086,1.07812c0.19,0.14 0.39914,0.21094 0.61914,0.21094c0.3,0 0.58906,-0.13086 0.78906,-0.38086c0.34,-0.44 0.26008,-1.0682 -0.16992,-1.4082l-23,-17.95117c-0.185,-0.14 -0.40164,-0.20898 -0.61914,-0.20898zM35,5v1.05078l6,4.67969v-5.73047z"/>
                        </svg> 
                        <span className="hidden md:block">Home</span>
                    </div>

                </NavLink>
                {userData?.isLoggedIn && (
                    <>
                        <NavLink to="/mywishlist" className="relative text-white hover:text-gray-400 group ">
                            <div className="items-center gap-1 flex felx-row ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                                <span className="hidden md:block">Wishlist</span>
                            </div>
                            <span className=" absolute bg-teal-600 text-white rounded-full top-[-5px] left-[7px] px-1 text-xs group-hover:[top:-15px] transition-all duration-200 ">
                                {userDbData ? userDbData.wishlist?.length : 0}
                            </span>
                        </ NavLink>
                        <NavLink to="/cart" className="relative text-white hover:text-gray-400 group block">
                            <div className="flex items-center gap-1">
                                <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor">
                                <path
                                    fillRule="nonzero"
                                    d="M0 .75A.75.75 0 0 1 .75 0h.558c.95 0 1.52.639 1.845 1.233.217.396.374.855.497 1.271a1.29 1.29 0 0 1 .1-.004h12.498c.83 0 1.43.794 1.202 1.593l-1.828 6.409a2.75 2.75 0 0 1-2.644 1.996H7.03a2.75 2.75 0 0 1-2.652-2.022l-.76-2.772-1.26-4.248-.001-.008c-.156-.567-.302-1.098-.52-1.494-.21-.385-.378-.454-.529-.454H.75A.75.75 0 0 1 0 .75zM6.5 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM13.5 17.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                />
                                </svg>
                                <span className="hidden md:block">Cart</span>
                            </div>
                            <span className="absolute bg-red-600 text-white rounded-full top-[-10px] left-[7px] px-1 text-xs group-hover:[top:-15px] transition-all duration-200">
                                {userDbData ? userDbData.cart?.length : 0}
                            </span>
                        </NavLink>
                    </>
                )}

                <button
                 className="text-white hover:text-gray-400 relative group gap-2"
                 >
                    <div className="flex items-center justify-center">
                        <svg width="32px" height="32px" viewBox="0 0 32 32">
                        <g id="Header-Navigation-Journey" stroke="none" strokeWidth="1" fill="currentColor" fillRule="evenodd">
                        <g id="White" transform="translate(0.000000, -0.000000)" fill="currentColor"><path d="M20.180991,21.3859092 C18.8196414,20.8180231 14.1158063,20.8180231 12.8185945,21.3859092 C9.99034533,22.3006596 7.60012118,24.2287112 6.10754752,26.7993114 C5.96435548,27.0467795 5.9641374,27.3518589 6.10697549,27.5995315 C6.24981358,27.847204 6.51398531,27.9998042 6.79989512,27.9998 L26.1998303,28 C26.4857463,28 26.7499291,27.847421 26.89277,27.599743 C27.035611,27.3520651 27.0353849,27.0469773 26.8921769,26.7995113 C25.3996102,24.2288015 23.0093267,22.3006711 20.180991,21.3859092 Z" id="Path" fillRule="nonzero"></path><circle id="Oval" cx="16.5" cy="13.5" r="5.5"></circle></g></g>
                    </svg>
                        <span className="hidden sm:block">{userDbData?.firstName}</span>
                    </div>
                     {userData && userData.isLoggedIn && (
                        <div className='hidden group-hover:flex flex-col absolute gap-1.5 bg-black p-5 left-[-30px] sm:left-[-1px] min-w-32' id="userDropdown">
                        <Link to="/userprofile" className="border-b p-1.5">Profile</Link>
                        <Link to="/myorders" className="border-b p-1.5" >My Orders</Link>
                        <Link to="/cart" className="border-b p-1.5 sm:hidden block" >Cart</Link>
                        <Link to="/mywishlist" className="border-b p-1.5 sm:hidden block" >Wishlist</Link>
                        <Link to="/useraccount" className="border-b p-1.5" >Account</Link>
                        <Link 
                            to="/" 
                            className="border-b p-1.5" 
                            onClick={() => {handleLogout()}}
                            >Logout
                        </Link>
                    </div>
                     )}
                     {userData && !userData.isLoggedIn && (
                        <div className='hidden group-hover:flex flex-col absolute gap-1.5 bg-black p-3 left-[-9px]' id="userDropdown">
                        <Link to="/signin" className="border-b p-1.5">Sign In</Link>
                        <Link to="/signup" className="border-b p-1.5" >Sign UP</Link>
                        <Link to="/logout" className="border-b p-1.5" >Contact US</Link>
                    </div>
                     )}
                </button>
            </div>
        </div>
   </>
  )
}

export default Nav