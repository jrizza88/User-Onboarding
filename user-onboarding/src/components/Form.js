import React, {useState} from 'react';


const Form = () => {
    // create a form to onboard a new user to the system. 
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        TermsOfService: ""
    })

    const handleChange = e => {
        console.log('target name: ', e.target.name)
        console.log('targer value: ', e.target.value)
        setForm({ ...form, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" 
                  id="name" 
                  name="name" 
                  placeHolder="Enter Name"
                   onChange={handleChange} 
                   value={form.name} 
                />
            </form>
        </div>
    )
}
export default Form;