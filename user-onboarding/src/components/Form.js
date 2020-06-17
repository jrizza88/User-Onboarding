import React, {useState} from 'react';
import * as yup from 'yup';

const formSchema = yup.object.shape({
    name: yup.string().required('You must enter in a name'),
    email: yup.string().email('Must be a valid email, missing @ symbol').required('Must include email to submit'),
    password: yup.string().required('You must enter in a password, minimum of four characters').min(4),
    TermsOfService: yup.boolean([true], 'You must agree to the services')
})

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
        console.log('target value: ', e.target.value)
        console.log('target checked: ', e.target.checked)
        // set value to check via ternary operator if the target is 'checked' or a value.
        const value = e.target.type === "checkbox" ? e.target.checked: e.target.value; 
        setForm({ ...form, [e.target.name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('form submitted!')
        // do an post request here. 
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" 
                  id="name" 
                  name="name" 
                  placeHolder="Enter Name"
                   onChange={handleChange} 
                   value={form.name} 
                />
                <label htmlFor="name">Email</label>
                <input type="email" 
                  id="email" 
                  name="email" 
                  placeHolder="Enter Email"
                   onChange={handleChange} 
                   value={form.email} 
                />
                <label htmlFor="name">password</label>
                <input type="text" 
                   id="password" 
                   name="password" 
                   placeHolder="Enter password"
                   onChange={handleChange} 
                   value={form.password} 
                />
                <label htmlFor="name">TermsOfService</label>
                <input type="checkbox" 
                   id="TermsOfService" 
                   name="TermsOfService" 
                   onChange={handleChange} 
                   checked={form.TermsOfService} 
                />
                <button>Submit</button>
            </form>
         
        </div>
    )
}
export default Form;