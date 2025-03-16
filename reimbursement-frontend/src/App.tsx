import Box from '@mui/material/Box'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './Components/Login'
import { Register } from './Components/Register'
import { useEffect, useState } from 'react'
import { ReimbursementForEmployeeTable } from './Components/Tables/ReimbursementForEmployeeTable'
import { ReimbursementTable } from './Components/Tables/ReimbursementTable'
import { EmployeeTable } from './Components/Tables/EmployeeTable'
import { ReimbursementForm } from './Components/ReimbursementForm'
import { NavBar } from './Components/NavBar'


function App() {

const [currentEmployeeid,setCurrentEmployeeid] = useState("");


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
