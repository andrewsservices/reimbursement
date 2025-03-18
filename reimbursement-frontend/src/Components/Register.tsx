import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeAuth } from '../GlobalData/AuthContext'
import { LoginProps } from '../InterFaces/LoginProps'


export const Register:React.FC<LoginProps> = ({setCurrentEmployeeid}) => {

    const { loggedInEmployee, setLoggedInEmployee } = employeeAuth();

    const navigate = useNavigate()


    const[registerCreds, setRegisterCreds] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    })

    const [loggedIn, setLoggedIn] = useState(false);

    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setRegisterCreds((registerCreds)=>({...registerCreds,[name]: value}))
    }

    const register = async () => {
        try{


             const response = await axios.post("http://18.116.21.61:8080/auth/register",registerCreds,{withCredentials:true})
            // store.loggedInEmployee = response.data;
            // const currentEmployee = store.loggedInEmployee;
            // setCurrentEmployeeid(currentEmployee.employeeid);

            //!NEW! Context API
            setLoggedInEmployee(response.data);
            setLoggedIn(true);


            navigate("/basic")
        } catch{
            alert("login unsuccessful")
        }
    }

    useEffect(() => {
        if (loggedIn && loggedInEmployee) {
            loggedInEmployee.title = "basic";
          alert(
            `${loggedInEmployee.username} has logged in, welcome. You are a ${loggedInEmployee.title} employee`
          );
          setCurrentEmployeeid(loggedInEmployee.employeeid);

          navigate("/basic");
        }
      }, [loggedIn, loggedInEmployee, navigate]);


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
