import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface LoggedInEmployee{
    employeeId:string,
    username:string,
    title:string
}

interface AuthContextType{
    loggedInEmployee: LoggedInEmployee | null;
    setLoggedInEmployee: (employee: LoggedInEmployee | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider:React.FC<{children:ReactNode}> = ({children}) => {

    const[loggedInEmployee,setLoggedInEmployee] = useState<LoggedInEmployee | null>(
        JSON.parse(localStorage.getItem("loggedInEmployee") || 'null')
    )

    useEffect(()=>{
        if(loggedInEmployee){
            localStorage.setItem('loggedInEmployee',JSON.stringify(loggedInEmployee))
        } else {
            localStorage.removeItem('loggedInEmployee')
        }
    }, [loggedInEmployee])

    return(
        <AuthContext.Provider value={{loggedInEmployee,setLoggedInEmployee}}>
            {children}
        </AuthContext.Provider>
    )

}

export const employeeAuth = () : AuthContextType => {
    const context = useContext(AuthContext)

    if(!context){
        throw new Error('employeeAuth must be used from within an AuthProvider')
    }

    return context
}