import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2"
import { resetErrorAction } from '../../Redux/slices/globalSlice/globalSlice';



const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });
  


const ErrorMessage = ({message})=>{
   const dispatch = useDispatch()
    Toast.fire({
        icon: "error",
        // title: "oops",
        text:message
      });
      dispatch(resetErrorAction())

}

export default ErrorMessage