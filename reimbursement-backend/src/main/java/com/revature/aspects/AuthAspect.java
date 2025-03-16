package com.revature.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpSession;

@Aspect
@Component
public class AuthAspect {


    //@Before allows us to invoke this method BEFORE any method specify
    @Order(1) //This will run first
    @Before("within(com.revature.Controllers.*)" +
    "&& !within(com.revature.Controllers.AuthController)")
    public void checkLoggedIn(){
        //get access to the session (or lack therof)
        ServletRequestAttributes attributes =(ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attributes.getRequest().getSession(false);

        if(session == null){
            throw new IllegalArgumentException("Employee must be logged in to do this!");
        }


        if(session == null || session.getAttribute("employeeid") == null){
            throw new IllegalArgumentException("Employee must be logged in to do this!");
        }
    }

    //Before any method annotation with @AdminOnly, check is the user an admin
    @Order(2)
    @Before("@annotation(AdminOnly)")
    public void checkAdmin(){
        //get access to the session (or lack therof)
        ServletRequestAttributes attributes =(ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
        HttpSession session = attributes.getRequest().getSession(false);

        if(session == null){
            throw new IllegalArgumentException("Employee must be logged in to do this!");
        }


        String title = session.getAttribute("title").toString();



        //If the User's role != "admin", throw an exception

        System.out.println("TTTTTTTTTIIIIIIITTTTTTLLLLLTTTTTT" + title);

        if(!title.equals("manager")){
            throw new IllegalArgumentException("Employee must be a manager to do this!");
        }
    }


}

