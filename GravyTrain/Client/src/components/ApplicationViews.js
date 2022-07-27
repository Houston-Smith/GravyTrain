import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { ReviewList } from "./review/ReviewList";
import { ReviewForm } from "./review/ReviewForm";
import { ReviewDetails } from "./review/ReviewDetails";
import { ReviewEdit } from "./review/ReviewEdit";

export default function ApplicationViews({ isLoggedIn }) {
  
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <ReviewList /> : <Navigate to="/login" />}
          />    
                
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} /> 

          <Route path="review" element={<ReviewList/>}/>
          <Route path="review/add" element={<ReviewForm/>}/>
          <Route path="/review/:reviewId/details" element={<ReviewDetails/>}/> 
          <Route path="/review/:reviewId/edit" element={<ReviewEdit/>}/> 

        </Route>
      </Routes>
    </main>
  );
}
