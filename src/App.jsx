import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'


function App() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [alldata, setAlldata] = useState('')

  const URL = 'https://mern-hpk3.onrender.com';
  // const URL = 'http://localhost:8000';

  useEffect(() => {
    axios.get(`${URL}/get`)
      .then((data) => setAlldata(data))
      .catch((error) => console.log(error))
  }, [])

  const handleClick = () => {

    if (!title || !description) {
      alert("Please enter the details");
    }

    axios.post(`${URL}/add`, { title, description })
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

  if (!alldata) {
    return (
      <>
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </>
    )
  }


  return (
    <>
      <div className='main_div'>
        <div className='input_div'>
          <div className="logo">Notes</div>
          <input type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} className='title' />
          <input type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} className='description' />
          {/* <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} /> */}
          {/* <button onClick={handleClick}>Add</button> */}
          <div>
            <button className="button" onClick={handleClick}>
              Add Note
            </button>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {
            alldata && alldata.data.map((user, i) => (
              <>
                <div className="note_main_div">
                  {/* <div className='note_div' data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
                  <div className='note_div'>
                    <h2 key={i} className="note_title">{user.title}</h2>
                    <p className='note_desc'>{user.description}</p>
                    <div className='btn_div'>
                      <button onClick={() => handleUpdate(user._id)} className='update_btn'>Update</button>
                      <button onClick={() => handledelete(user._id)}>Delete</button>
                    </div>
                  </div>
                </div>

                <div>
                  {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                  </button> */}

                  <div className="modal fade" tabIndex="-1" id='exampleModal'>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">{user.title}</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p>{user.description}</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))
          }
        </div>



      </div>
    </>
  )
}

export default App
