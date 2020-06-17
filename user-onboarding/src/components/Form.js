import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('You must enter in a name'),
    email: yup.string().email('Must be a valid email, missing @ symbol').required('Must include email to submit'),
    password: yup.string().required('You must enter in a password, minimum of four characters').min(4),
    TermsOfService: yup.boolean([true], 'You must agree to the services')
})

const Form = () => {
    // create a form to onboard a new user to the system. 
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        TermsOfService: ""
    });

    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
    // Everytime formState changes, check to see if it passes verification.
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        });
    // If it does, then enable the submit button, otherwise disable
    }, [formState])

    const validate = () => {

    }

    const handleChange = e => {
        console.log('target name: ', e.target.name)
        console.log('target value: ', e.target.value)
        console.log('target checked: ', e.target.checked)

        e.persist();
        
        // set value to check via ternary operator if the target is 'checked' or a value.
        const value = e.target.type === "checkbox" ? e.target.checked: e.target.value; 
        setFormState({ ...formState, [e.target.name]: value})
    }



    const handleSubmit = e => {
        e.preventDefault();
        console.log('form submitted!')
        axios.post('https://reqres.in/api/users')
        .then(response => console.log(response))
        .catch(error => console.error(error))
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
                   value={formState.name} 
                />
                <label htmlFor="name">Email</label>
                <input type="email" 
                  id="email" 
                  name="email" 
                  placeHolder="Enter Email"
                   onChange={handleChange} 
                   value={formState.email} 
                />
                <label htmlFor="name">password</label>
                <input type="text" 
                   id="password" 
                   name="password" 
                   placeHolder="Enter password"
                   onChange={handleChange} 
                   value={formState.password} 
                />
                <label htmlFor="name">TermsOfService</label>
                <input type="checkbox" 
                   id="TermsOfService" 
                   name="TermsOfService" 
                   onChange={handleChange} 
                   checked={formState.TermsOfService} 
                />
                <button disabled={buttonDisabled}>Submit</button>
            </form>
         
        </div>
    )
}
export default Form;