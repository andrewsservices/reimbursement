import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { store } from '../GlobalData/store'
import { LoginProps } from '../InterFaces/LoginProps'
import { useNavigate } from 'react-router-dom'
import { employeeAuth } from '../GlobalData/AuthContext'


export const Register:React.FC<LoginProps> = ({setCurrentEmployeeid}) => {

    const navigate = useNavigate()


    const[registerCreds, setRegisterCreds] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    })

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setRegisterCreds((registerCreds)=>({...registerCreds,[name]: value}))
    }

    const register = async () => {
        try{


             const response = await axios.post("http://localhost:8080/auth/register",registerCreds,{withCredentials:true})
            store.loggedInEmployee = response.data;
            const currentEmployee = store.loggedInEmployee;
            setCurrentEmployeeid(currentEmployee.employeeid);
            alert(store.loggedInEmployee.username + " has registered and is logged in , welcome.  You are a " + store.loggedInEmployee.title + " employee");


            navigate("/basic")
        } catch{
            alert("login unsuccessful")
        }
    }

    return(

        <div className="centered">
            <h1>Register</h1>

            <TextField  name="firstname" id="outlined-basic" label="First Name" variant="outlined" onChange={storeValues}/>
            <TextField  name="lastname" id="outlined-basic" label="Last Name" variant="outlined" onChange={storeValues}/>
            <TextField  name="username" id="outlined-basic" label="User Name" variant="outlined" onChange={storeValues}/>
            <TextField type="password" name="password" id="outlined-basic" label="Password" variant="outlined" onChange={storeValues}/>


            <div>
                <Button  onClick={register} variant="contained">Register</Button>
            </div>

         </div>

    )
}
