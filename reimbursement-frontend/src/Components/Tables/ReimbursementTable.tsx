import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Reimbursement } from "../../InterFaces/Reimbursement"

import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { ReimbursementProps } from "../../InterFaces/ReimbursementProps"


export const ReimbursementTable:React.FC = () => {
    const [reimbursements,setReimbursements] = useState<Reimbursement[]>([])
    const [view,setView] = useState<string>("all");
    const navigate = useNavigate()



    useEffect(()=>{
        getAllReimbursements()
    },[])


    const approveReimbursement = async (id:string) => {
        try{
            const response = await axios.patch("http://localhost:8080/reimb/approve/" + id,{},{withCredentials:true});
            console.log(response.data);
            alert("Reimbursement number: " + id + " was approved");
            getAllReimbursements();
        } catch {
            alert("approval unsuccessful")
        }
    }

    const denyReimbursement = async (id:string) => {
        try{
            const response = await axios.patch("http://localhost:8080/reimb/deny/" + id,{},{withCredentials:true});
            console.log(response.data);
            alert("Reimbursement number: " + id + " was denied");
            getAllReimbursements();
        } catch {
            alert("deny unsuccessful")
        }
    }


    const getAllReimbursements = async() => {
        try{
            const response = await axios.get("http://localhost:8080/reimb",{withCredentials:true})
            setReimbursements(response.data)

        } catch {
            alert("something has gone awry")
        }
    }

    const toggleView = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        setView(value);
        console.log(value);
    };

    // const updateRequest = (reimbursement:Reimbursement) => {
    //     alert("Reimbursement " + reimbursement.reimbursementid + " has been fake updated or deleted")

    //     //TODO: Could definitely make another call to getAllUsers for automatic updates
    //     //TODO2: Cache the list of users and update THAT so we don't make a repeat DB call
    // }

    return(
        <>
            <div className="space-between">
                <Button variant="outlined" onClick={()=>navigate("/employeetable")}>Go To Employees</Button>
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
                        <TableCell align="right">Employee ID</TableCell>
                        <TableCell align="right">Change Reimbursement Status</TableCell>
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
                                        <TableCell align="right">{r.employeeid}</TableCell>
                                        <TableCell align="right">
                                            {r.status === "pending" ? (<><Button variant="contained" onClick={() => approveReimbursement(r.reimbursementid)}>Approve</Button><Button variant="outlined" onClick={() => denyReimbursement(r.reimbursementid)}>Deny</Button></>): null}
                                        </TableCell>
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
                                <TableCell align="right">{r.employeeid}</TableCell>
                                <TableCell align="right">
                                    {
                                        r.status ==="pending" ? (
                                            <>
                                                <Button variant="contained" onClick={() => approveReimbursement(r.reimbursementid)}>Approve</Button>
                                                <Button variant="outlined" onClick={() => denyReimbursement(r.reimbursementid)}>Deny</Button>
                                            </>
                                        ) : null
                                    }
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        )
                    }

                    </Table>
            </TableContainer>

        </>



    )
}