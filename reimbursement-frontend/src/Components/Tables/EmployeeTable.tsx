import axios from "axios";
import { useEffect, useState } from "react";
import { Employee } from "../../InterFaces/Employee";


import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";



export const EmployeeTable:React.FC =() => {
    const [employees, setEmployees] = useState<Employee[]>([])

    const navigate = useNavigate();

    useEffect(()=>{
        getAllEmployees();
    },[])

    const getAllEmployees = async() => {
        try{
            const response = await axios.get("http://localhost:8080/employees",{withCredentials:true})
            setEmployees(response.data);
            console.log(response)
        } catch {
            alert("something went awry")
        }
    }

    const promoteEmployee = async (id:number) => {
        try{
            const response = await axios.patch("http://localhost:8080/employees/promote/" + id,{},{withCredentials:true})
            alert("Employee number: " + id + " was promoted");
            getAllEmployees();
            console.log(response)
        } catch {
            alert("promotion unsuccessful")
        }
    }

    const fireEmployee = async (id:number) => {
        try{
            const response = await axios.delete("http://localhost:8080/employees/" + id,{withCredentials:true})
            alert("Employee number: " + id + " was fired");
            getAllEmployees();
            console.log(response)
        } catch {
            alert("fire unsuccessful")
        }
    }


    return(
        <>


           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Employee ID</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">Title</TableCell>
                        <TableCell align="right">Change Status</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {employees.map((e) => (
                        <TableRow
                        key={e.employeeid}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        {/* <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell> */}
                        <TableCell align="right">{e.employeeid}</TableCell>
                        <TableCell align="right">{e.firstname}</TableCell>
                        <TableCell align="right">{e.lastname}</TableCell>
                        <TableCell align="right">{e.title}</TableCell>
                        <TableCell align="right">
                                <Button variant="contained"
                                    onClick={() => promoteEmployee(e.employeeid)}
                                >Promote</Button>
                                <Button variant="outlined"
                                    onClick={()=>fireEmployee(e.employeeid)}
                                >Fire</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
        </TableContainer>

            <Button  onClick={()=>navigate("/reimb")} variant="contained">Back To Reimbursements</Button>
        </>
    )
}