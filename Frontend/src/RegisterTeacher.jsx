import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import isValidEmail from "./library/validEmailChecker.js"
import axios from "./library/axiosInstance.js"
import { useNavigate } from 'react-router-dom'

function RegisterTeacher() {

  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dept, setDept] = useState("")
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {

  }, [])

  async function handleSubmit(e) {
    e.preventDefault();

    let obj = {
      name: name.trim(),
      email: email.trim(),
      dept: dept.trim(),
      password: password.trim(),
      gender: gender.trim(),
    }

    if (!obj.name || !obj.email || !obj.dept || !obj.password || !obj.gender) {
      alert("all fields are required")
      return;
    }

    if (!isValidEmail(obj.email)) {
      alert("Enter a valid Email Address")
      return;
    }

    



    console.log(obj)

    const newObj = { ...obj }


    let response = await axios.post("/auth/api/v1/supervisor/register",
      newObj,
      { withCredentials: true }
    );

    alert(response.data.message)

    if (!response.data.success) {
      return navigate("/register/teacher")
    }

    navigate("/")
  }

  return (

    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Register</h1>
            <p className="mt-2 text-gray-500">Register below to access your account</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>

              <div className="relative mt-6">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  required
                  placeholder="name"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="name"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Name
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>
              <div className="w-full relative mt-6 flex items-center justify-evenly gap-4">

                <div className="relative w-[77%]">
                  <select
                    id="dept"
                    name="dept"
                    required
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">
                      Department
                    </option>
                    <option value="CSE">Computer Science and Engineering</option>
                    <option value="EEE">Electrical Engineering</option>
                    <option value="ICE">Information and Communication Engineering</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="BBA">Business Administration</option>
                    <option value="ENG">English</option>
                    <option value="LAW">Law</option>
                  </select>

                </div>


                <div className="relative w-[23%]">
                  <select
                    id="dept"
                    name="dept"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="peer mt-1 w-full border-b-2 border-gray-300 bg-transparent px-0 py-1 text-gray-900 focus:border-gray-500 focus:outline-none"
                  >
                    <option value="" disabled className="text-gray-400">
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>

                  </select>

                </div>
              </div>

              <div className="relative mt-6">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  reqired
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                <button

                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Submit
                </button>
              </div>
              <p className="text-center text-sm text-gray-500">
                Already have an account yet?
                <NavLink
                  to="/login/teacher"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  {" "}
                  Login
                </NavLink>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterTeacher