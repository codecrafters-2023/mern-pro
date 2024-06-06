import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import AddNote from './addNote'
import { LiaPenSolid } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";


function App() {

  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: '',
    description: '',
  })

  const [alldata, setAlldata] = useState('')

  const URL = 'https://mern-hpk3.onrender.com';
  // const URL = 'http://localhost:8000';

  useEffect(() => {
    axios.get(`${URL}/get`)
      .then((data) => setAlldata(data))
      .catch((error) => console.log(error))
  }, [])

  const handledelete = (id) => {
    axios.delete(`${URL}/delete/` + id)
      .then(() => location.reload())
      .catch((error) => console.log(error))
  }

  const handleUpdate = (user) => {
    setUpdateForm({ title: user.title, description: user.description, _id: user._id })
  }

  const handleFieldChange = (event) => {
    const { value, name } = event.target;

    setUpdateForm({
      ...updateForm,
      [name]: value
    })
  }

  const handleFieldUpdate = async () => {
    const { title, description } = updateForm;

    await axios.put(`${URL}/update/${updateForm._id}`, { title, description })
      .then(() => location.reload())
      .catch((err) => console.log(err))

  }

  if (!alldata) {
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
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
        </div>
      </>
    )
  }


  return (
    <>
      <div className='main_div'>

        <AddNote />

        <div className='notes_outer_div'>
          {
            alldata && alldata.data.map((user, i) => (
              <>
                <div className="note_main_div">
                  <div className='note_div'>
                    <h2 key={i} className="note_title">{user.title}</h2>
                    <p className='note_desc' style={{ height:"95px",overflow:"hidden"}}>{user.description}</p>
                    <div className='btn_div'>
                      {/* <button onClick={() => handleUpdate(user)} className='update_btn' data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button> */}

                      <div className='note_btn edit_btn'><LiaPenSolid onClick={() => handleUpdate(user)} data-bs-toggle="modal" data-bs-target="#exampleModal"/></div>
                      <div className='note_btn delete_btn'><MdDeleteOutline onClick={() => handledelete(user._id)}/></div>

                      {/* <button onClick={() => handledelete(user._id)}>Delete</button> */}
                    </div>
                  </div>
                </div >

                <div>
                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <label htmlFor="">Title</label>
                          <input type="text" name='title' value={updateForm.title} onChange={handleFieldChange} />
                          <label htmlFor="">Description</label>
                          <textarea rows={5} type="text" name='description' value={updateForm.description} onChange={handleFieldChange}></textarea>
                          <div className="modal-footer">
                            <button type="button" onClick={handleFieldUpdate} className="btn btn-primary" data-bs-dismiss="modal">Done</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </>
            ))
          }
        </div>
      </div >

    </>
  )
}

export default App
