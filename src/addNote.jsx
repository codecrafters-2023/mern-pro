import axios from 'axios'
import { useState } from 'react'
import './App.css'

const AddNote = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    // const URL = 'http://localhost:8000';
    const URL = 'https://mern-hpk3.onrender.com';
    const handleClick = () => {

        if (!title || !description) {
            alert("Please enter the details");
        }

        axios.post(`${URL}/add`, { title, description })
            .then(() => location.reload())
            .catch((error) => console.log(error))
    }

    return (
        <div>
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
        </div>
    )
}

export default AddNote
