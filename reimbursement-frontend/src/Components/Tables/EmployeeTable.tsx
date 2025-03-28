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
import { employeeAuth } from '../../GlobalData/AuthContext';



export const EmployeeTable:React.FC =() => {
    const [employees, setEmployees] = useState<Employee[]>([])

    const {loggedInEmployee} = employeeAuth();

    const navigate = useNavigate();

    useEffect(()=>{
        getAllEmployees();
    },[])

    const getAllEmployees = async() => {

        console.log(loggedInEmployee?.jwt)

        try{
            const response = await axios.get("http://18.116.21.61:8080/employees",{
                headers: {
                    'Authorization': `Bearer ${loggedInEmployee?.jwt}`
                }
            })




            setEmployees(response.data);
            (response)
        } catch {
            alert("something went awry")
        }
    }

    const promoteEmployee = async (id:number) => {
        try{
            const response = await axios.patch("http://18.116.21.61:8080/employees/promote/" + id,{},{headers: {
                    'Authorization': `Bearer ${loggedInEmployee?.jwt}`
                }})
            alert("Employee number: " + id + " was promoted");
            getAllEmployees();
            (response)
        } catch {
            alert("promotion unsuccessful")
        }
    }

    const fireEmployee = async (id:number) => {
        try{
            const response = await axios.delete("http://18.116.21.61:8080/employees/" + id,{headers: {
                    'Authorization': `Bearer ${loggedInEmployee?.jwt}`
                }})
            alert("Employee number: " + id + " was fired");
            getAllEmployees();
            (response)
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