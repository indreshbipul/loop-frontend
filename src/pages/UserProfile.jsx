import {useState, useEffect} from "react";

import useAuthHook from "../hooks/authHook";
import authService from "../services/authServices";

function UserProfile() { 
  const [editable, setEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState({});
  const [userDbData, setUserDbData] = useState();
  const {refresh, userData} = useAuthHook();

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
      },[userData, refresh])

  const handelChange = (e) =>{
    const {name, value} = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }
  const handelUpdateUserData = () =>{
    authService.updateUserData(userData?.user._id, updatedData)
      .then((data) => {
        if (data === 200) {
          refresh([]);
          setEditable(false);
        } else {
          alert("Failed to update user data");
        }
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("An error occurred while updating user data");
      });

  }

   if (!userData || !userDbData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-purple-500 border-solid mb-2"></div>
        <div className="text-red-500 text-center">Loading...</div>
      </div>
    );   
   }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center font-sans p-6">
      <main className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-8">
        <section className="flex flex-col md:flex-row md:items-center md:space-x-8 mb-10">
          <div className="flex justify-center mb-6 md:mb-0">
            <img
              src="https://imgs.search.brave.com/FEGp1hW7tTvsAJJmOfeoXrEIXEACiNWWR0T33_Ni968/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdz/LnNlYXJjaC5icmF2/ZS5jb20vM2pEcmwt/R3JvTTBTSG4tYzdx/ek12dllTVExMdE5q/bDVQa2VGcUd6MEVH/Zy9yczpmaXQ6NTAw/OjA6MDowL2c6Y2Uv/YUhSMGNITTZMeTl0/WldScC9ZUzVwYzNS/dlkydHdhRzkwL2J5/NWpiMjB2YVdRdk1U/SXkvTXpZM01UTTVN/aTkyWldOMC9iM0l2/WkdWbVlYVnNkQzF3/L2NtOW1hV3hsTFhC/cFkzUjEvY21VdFlY/WmhkR0Z5TFhCby9i/M1J2TFhCc1lXTmxh/RzlzL1pHVnlMWFps/WTNSdmNpMXAvYkd4/MWMzUnlZWFJwYjI0/dS9hbkJuUDNNOU5q/RXllRFl4L01pWjNQ/VEFtYXoweU1DWmov/UFhNd1lWUmtiVlEx/WVZVMi9Zamh2ZERk/V1MyMHhNVVJsL1NV/UTJUbU4wVWtOd1Fq/YzEvTlhKQk1VSkpV/REE5"
              alt="User avatar"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-semibold text-gray-800">
              {userDbData?.firstName} {userDbData?.lastName}
            </h1>
            <p className="text-gray-600 mt-1">
              {userData?.email}
            </p>
          </div>
        </section>

        <form  className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input type="text" name="firstName"
                onChange={(e) => {
                  if (editable) {
                    handelChange(e);
                  }
                }}
                disabled={!editable}
                value ={editable ? updatedData.firstName : userDbData?.firstName || ''}
                className={`w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 bg-gray-100 ${editable ? 'cursor-text' : 'cursor-not-allowed'} focus:outline-none`}/>
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                disabled={!editable}
                onChange={(e) => {
                  if (editable) {
                    handelChange(e);
                  }
                }}
                value={editable ? updatedData.lastName : userDbData?.lastName || ''}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 bg-gray-100 focus:outline-none"/>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                disabled={!editable}
                onChange={(e) => {
                  if (editable) {
                    handelChange(e);
                  }
                }}
                value={editable ? updatedData.email : userDbData?.email || ''}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 bg-gray-100 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-gray-700 font-medium mb-2">
                Gender
              </label>
              <select
                name="gender"
                disabled={!editable}
                onChange={(e) => {
                  if (editable) {
                    handelChange(e);
                  }
                }}
                value={editable ? updatedData.gender : userDbData?.gender}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 bg-gray-100 focus:outline-none"
              >
                  <option value="male" > Male </option>
                  <option value = "female" > Female </option>
                  <option value="Other">Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                pattern="[0-9]{10}"  
                disabled={!editable}
                onChange={(e) => {
                  if (editable) {
                    handelChange(e);
                  }
                }}
                value={editable ? updatedData.mobile : userDbData?.mobile || ''}
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 bg-gray-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className={`px-6 py-3 bg-purple-600 text-white rounded-md font-semibold hover:bg-purple-700 transition ${!editable ? 'cursor-text' : 'opacity-50 cursor-not-allowed'}`}
              onClick={()=>{
                setEditable(true);
              }}
            >
              Edit
            </button>
            <button
              type="submit"
              disabled={!editable}
              onClick={(e)=>{
                e.preventDefault();
                handelUpdateUserData();
                setEditable(false);
              }}

              className={`px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition ${editable ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default UserProfile;
