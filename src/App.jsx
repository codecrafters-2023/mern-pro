import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [alldata, setAlldata] = useState('')

const URL = 'https://mern-hpk3.onrender.com';

  useEffect(() => {
    axios.get(`${URL}/get`)
      .then((data) => setAlldata(data))
      .catch((error) => console.log(error))
  }, [])

  const handleClick = () => {

    if (!name || !email) {
      alert("Please enter a name and email");
    }

    axios.post(`${URL}/add`, { name: name, email: email })
      .then(() => location.reload())
      .catch((error) => console.log(error))
  }

  const handledelete = (id) => {
    axios.delete(`${URL}/delete/` + id)
      .then(() => location.reload())
      .catch((error) => console.log(error))
  }

  const handleUpdate = (id) => {
    axios.put(`${URL}/update/` + id)
      .then(() => location.reload())
      .catch((error) => console.log(error))
  }


  return (
    <>
      <div className='main_div'>
        <div className='input_div'>
          <input type="text" placeholder='Username' onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleClick}>Add</button>
        </div>

        {
          alldata && alldata.data.map((user, i) => (
            <>
              <div className='user_div'>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {
                    user.status === true ? <BsFillCheckCircleFill style={{ color: "lightgray" }} /> : <BsCircleFill style={{ color: "lightgray" }} />
                  }
                  <h2 key={i} className={user.status === true ? 'linethrough' : ''}>{user.name}</h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <MdOutlineDeleteOutline onClick={() => handledelete(user._id)} style={{ color: "lightgray", fontSize: "25px", cursor: "pointer" }} />
                  <GrUpdate onClick={() => handleUpdate(user._id)} style={{ color: "lightgray", fontSize: "20px", cursor: "pointer" }} />
                </div>
              </div>
            </>
          ))
        }
      </div>
    </>
  )
}

export default App