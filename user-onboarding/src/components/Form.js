import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import axios from 'axios';

const formSchema = yup.object().shape({
    name: yup.string().required('You must enter in a name'),
    email: yup.string().email('Must be a valid email, missing @ symbol').required('Must include email to submit'),
    password: yup.string().required('You must enter in a password, minimum of four characters').min(4),
    termsOfService: yup.boolean().oneOf([true], "Please agree to terms of use")
})

const Form = () => {
    // create a form to onboard a new user to the system. 
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        termsOfService: false
    });

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        termsOfService: ""
    });

    useEffect(() => {
    // Everytime formState changes, check to see if it passes verification.
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid)
        });
    // If it does, then enable the submit button, otherwise disable
    }, [formState])

    const validate = e => {
        let value = e.target.type === 'checkbox' ? e.target.checked: e.target.value;
        yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
            setErrorState({
                ...errorState, [e.target.name]: ""
            })
        })
        .catch(error => {
            setErrorState({
                ...errorState, [e.target.name]: error.errors[0]
            })
        })
    }

    const handleChange = e => {
        console.log('target name: ', e.target.name)
        console.log('target value: ', e.target.value)
        console.log('target checked: ', e.target.checked)

        e.persist();

        validate(e)

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
                {errorState.name.length > 0 ? (
                    <p className="error">{errorState.name}</p>
                ) : null}
                <input type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter Name"
                   onChange={handleChange} 
                   value={formState.name} 
                />
                
                <label htmlFor="name">Email</label>
                {errorState.email.length > 0 ? (<p className="error">{errorState.email}</p>): null}
                <input type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter Email"
                   onChange={handleChange} 
                   value={formState.email} 
                />
                
                <label htmlFor="name">password
                {errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>): null}
                <input type="text" 
                   id="password" 
                   name="password" 
                   placeholder="Enter password"
                   onChange={handleChange} 
                   value={formState.password} 
                />
                </label>
                <label htmlFor="name">TermsOfService
                <input 
                   type="checkbox" 
                   id="termsOfService" 
                   name="termsOfService" 
                   onChange={handleChange} 
                   checked={formState.termsOfService} 
                />
                {errorState.termsOfService.length > 0 ? (<p className="error">{errorState.termsOfService}</p>): null}
                </label>
                <button disabled={buttonDisabled}>Submit</button>
            </form>
         
        </div>
    )
}
export default Form;