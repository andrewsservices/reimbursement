import axios from "axios";
import { useState } from "react";

import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Employeeid } from "../InterFaces/Employeeid";

import { employeeAuth } from '../GlobalData/AuthContext';

export const ReimbursementForm:React.FC<Employeeid> = ({currentEmployeeid}) => {

    const navigate = useNavigate()
    const {loggedInEmployee} = employeeAuth();

    const[reimbursement, setReimbursement] = useState({
        description: "",
        amount: "",
        status: "pending",
        employeeid: currentEmployeeid
    })


    const storeValues = (event:React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        setReimbursement((reimbursement)=>({...reimbursement,[name]: value}))
    }
    const submitReimbursement = async () => {
        try{
            const response = await axios.post("http://3.135.216.7:8080/reimb",reimbursement,{headers: {
                    'Authorization': `Bearer ${loggedInEmployee?.jwt}`
                }})
            alert("reimbursement submitted")
            navigate("/basic");

        } catch{
            alert("could not post reimbursement")
        }
    }
    return (

        <div className="centered">
                <h1>Reimbursement Form</h1>

                <TextField  name="description" id="outlined-basic" label="description" variant="outlined" onChange={storeValues}/>
                <TextField  name="amount" id="outlined-basic" label="Amount" variant="outlined" onChange={storeValues}/>



                <div>
                    <Button  onClick={submitReimbursement} variant="contained">Submit</Button>
                </div>

        </div>
    )
}