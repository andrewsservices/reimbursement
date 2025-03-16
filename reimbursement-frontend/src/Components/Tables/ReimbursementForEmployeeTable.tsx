import { useEffect, useState } from "react"
import { Reimbursement } from "../../InterFaces/Reimbursement"
import axios from "axios"
import { Employeeid } from "../../InterFaces/Employeeid"
import { Button, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const ReimbursementForEmployeeTable:React.FC<Employeeid> = ({currentEmployeeid}) => {

    const navigate = useNavigate();

    const [reimbursements,setReimbursements] = useState<Reimbursement[]>([])
    const [view,setView] = useState<string>("all");

    useEffect(() => {
        if (currentEmployeeid) {
            getAllReimbursementsForEmployee();
        } else {
            console.error("currentEmployeeid is not defined");
        }
    }, [currentEmployeeid]);


    const getAllReimbursementsForEmployee = async() => {
        try{
            const response = await axios.get(`http://localhost:8080/reimb/employee/${currentEmployeeid}`, { withCredentials: true });
            if(response.status === 200){
                setReimbursements(response.data)
            } else {
                alert("something has gone awry")
            }
        } catch {
            alert("something has gone awry")
        }
    }

    const toggleView = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setView(value);
        console.log(value);
    };


    return(

        <>



            {reimbursements.length === 0 ? (
                <p>No reimbursements found for the current employee.</p>
            ) : (
                <>
                    <h1>Your Reimbursements ar listed below</h1>

                    <div className="space-between">

                        <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Show Reimbursements: </FormLabel>
                        <RadioGroup
                            defaultValue="all"
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={toggleView}

                        >
                            <FormControlLabel value="all" control={<Radio />} label="All" />
                            <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                        </RadioGroup>
                        </FormControl>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reimbursement ID</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Amount</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                            view === "pending" ? (
                                <TableBody>
                                    {reimbursements.filter(r=>r.status === "pending").map((r) => (
                                        <TableRow key={r.reimbursementid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="right">{r.reimbursementid}</TableCell>
                                            <TableCell align="right">{r.description}</TableCell>
                                            <TableCell align="right">{r.amount}</TableCell>
                                            <TableCell style={r.status === "denied" ? {color: "red"} : r.status === "approved" ? {color: "green"} : {}} align="right">{r.status}</TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            ) : (
                                <TableBody>
                                {reimbursements.map((r) => (
                                    <TableRow
                                    key={r.reimbursementid}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    {/* <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell> */}
                                    <TableCell align="right">{r.reimbursementid}</TableCell>
                                    <TableCell align="right">{r.description}</TableCell>
                                    <TableCell align="right">{r.amount}</TableCell>
                                    <TableCell style={r.status === "denied" ? {color: "red"} : r.status === "approved" ? {color: "green"} : {}} align="right">{r.status}</TableCell>


                                    </TableRow>
                                ))}
                                </TableBody>
                            )
                        }
                        </Table>
                    </TableContainer>

                </>

            )}

            <h1>If you would like to submit a new reimbursement, click the button below</h1>
            <Button  onClick={()=>navigate("/submitreimbursement")} variant="contained">Submit Reimbursement</Button>
        </>






    )
}