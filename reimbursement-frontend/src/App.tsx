import Box from '@mui/material/Box'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './Components/Login'
import { NavBar } from './Components/NavBar'
import { Register } from './Components/Register'
import { ReimbursementForm } from './Components/ReimbursementForm'
import { EmployeeTable } from './Components/Tables/EmployeeTable'
import { ReimbursementForEmployeeTable } from './Components/Tables/ReimbursementForEmployeeTable'
import { ReimbursementTable } from './Components/Tables/ReimbursementTable'


function App() {

const [currentEmployeeid,setCurrentEmployeeid] = useState("");

("currentEmployeeid " + currentEmployeeid);

  return (
  <>
  <NavBar/>
  <div className="App">
      <Box sx={{ width: '100%', maxWidth: 800 }} >
            <BrowserRouter>
              <Routes>
              < Route path="" element={
                <Login
                  setCurrentEmployeeid={setCurrentEmployeeid}
                />
                }/>
                <Route path="register" element={
                  <Register
                  setCurrentEmployeeid={setCurrentEmployeeid}
                  />}/>
                <Route path="employeetable" element={<EmployeeTable/>}/>
                <Route path="basic" element={
                  <ReimbursementForEmployeeTable
                    currentEmployeeid={currentEmployeeid}
                  />}/>
                <Route path="reimb" element={<ReimbursementTable/>}/>
                <Route path="submitreimbursement" element={<ReimbursementForm currentEmployeeid={currentEmployeeid}/>}/>
              </Routes>

            </BrowserRouter>
          </Box>
      </div>
  </>





  )
}

export default App
