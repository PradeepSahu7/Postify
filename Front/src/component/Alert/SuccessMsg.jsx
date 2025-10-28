import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { resetSuccessAction } from '../../Redux/slices/globalSlice/globalSlice';
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
const SuccessMsg = ({message})=>{
    Toast.fire({
        icon: "success",
        title: message
      });
      const dispatch = useDispatch();
      dispatch(resetSuccessAction());

}

export default SuccessMsg