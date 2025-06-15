import { useState } from 'react';
import authService from "../services/authServices";
import { useNavigate} from 'react-router-dom';

function UserSignin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[gender, setGender] = useState("");
  const navigate = useNavigate();


  const [error, setError] = useState([]);
  // const [success, setSuccess] = useState(false);
  const handelUserData = () => {
    if(!firstName || !lastName || !email || !mobile || !password || !confirmPassword){
      alert("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const userData = {
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      mobile: mobile,
    };
    authService.userSignUP(userData)
      .then(({status, data }) => {
          if (status === 400) {
            setError(data)
            throw new Error(" invalid data");
          }
          else if (status === 500) {
            // setSuccess(['Internal server error']);
            throw new Error("internal server error");
          }
          else {
            console.log("User registered successfully:", data);
            alert("User registered successfully");
            navigate('/signin'); 
          } 
      
      });
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] flex items-center justify-center font-sans relative">
      <div className="absolute top-0 left-0 w-full max-h-[10px]mt-4 "> 
          {error.map((errs, index) => (
            <p key={index} className="text-red-500 text-center ">{errs.msg}</p>
          ))}
      </div>
      <div
        role="main"
        aria-label="Sign up form"
        className=  {`bg-white rounded-xl shadow-lg max-w-2xl w-full  p-10`}>
          <h2 className={`text-3xl font-semibold text-gray-800 ${error.length ? `mt-${3+error.length}` : 'mt-1'} mb-8 text-center`}>
            Create Account
          </h2>
        <form id="signUpForm" className="flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                onChange={(e) =>{ 
                  setFirstName(e.target.value)}}
                id="firstName"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                onChange={(e) =>{ 
                  setLastName(e.target.value)}}
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"/>
            </div>
          </div>

          <fieldset className="space-y-2" aria-describedby="genderError">
            <legend className="block text-gray-700 font-medium mb-2">Gender</legend>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={(e) =>{ 
                    setGender(e.target.value)
                  }}
                  required
                  className="form-radio text-purple-600"/>
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={(e) =>{
                    setGender(e.target.value)
                  }}
                  className="form-radio text-purple-600"/>
                <span className="ml-2 text-gray-700">Female</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={(e) =>{
                    setGender(e.target.value)
                  }}
                  className="form-radio text-purple-600"/>
                <span className="ml-2 text-gray-700">Other</span>
              </label>
            </div>
          </fieldset>

          <div>
            <label  
            className="block text-gray-700 font-medium mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              onChange={(e) =>{
                setEmail(e.target.value)}}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                placeholder="Password"
                onChange={(e) =>{ 
                  setPassword(e.target.value)}}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"/>

            </div>
            <div>
              <label
                className="block text-gray-700 font-medium mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={(e) =>{ 
                  setConfirmPassword(e.target.value)}}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"/>
            </div>
          </div>

          <div>
            <label 
            className="block text-gray-700 font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="+91 **********"
              required
              onChange={(e) =>{
                setMobile(e.target.value)}}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"/>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
              className="form-checkbox text-purple-600"/>
            <label className="text-gray-700 text-sm">
              I agree to the{" "}
              <a
                href="#"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handelUserData()
             }}
     
            className="w-full bg-purple-600 text-white font-semibold py-3 rounded-md hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserSignin;
