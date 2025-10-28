import React, { useEffect, useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './component/HomePage/Home'
import Login from './component/Users/Login'
// import UserProfile from './component/Users/userProfile'
import PublicNavBar from './component/Navbar/PublicNavBar'
import PrivateNavBar from './component/Navbar/PrivateNavBar'
import { useSelector } from 'react-redux'
import ProtectedRoute from './component/AuthRoute/ProtectedRoute'
import Register from './component/Users/Register'
import PublicPost from './component/posts/publicPost'
import AddPost from './component/posts/AddPost'
import PostDetails from './component/posts/PostDetails'
import PostList from './component/posts/postList'
import UpdatePost from './component/posts/UpdatePost'
import PublicUserProfile from './component/Users/PublicUserProfile'
function App() {
  // const [isLoggedin,setIsLoggedIn] = useState(false)
  
  const {userAuth} =useSelector((state)=>state.users)
  const isLoggedin = userAuth?.userInfo?.token
  // useEffect(()=>{
  //   if(userAuth?.userInfo?.token)
  //   setIsLoggedIn((pre)=>!pre)
  // },[userAuth])
  return (
  <>
    {
     isLoggedin?<PrivateNavBar/>:<PublicNavBar/>
    }
    
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    {/* <Route path="/add-post" element={<AddPost/>}/> */}
   
    

    <Route path="/user-public-profile/:userId" element={<ProtectedRoute>
      <PublicUserProfile/>
    </ProtectedRoute>}/>

    <Route path="/add-post" element={<ProtectedRoute>
      <AddPost/>
    </ProtectedRoute>}/>

    <Route path="/post/:postId" element={<ProtectedRoute>
      <PostDetails/>
    </ProtectedRoute>}/>

    <Route path="/postlist" element={<ProtectedRoute>
      <PostList/>
    </ProtectedRoute>}/>

    <Route path="/updatePost/:postId" element={<ProtectedRoute>
      <UpdatePost/>
    </ProtectedRoute>}/>


  </Routes>
  </>
  )
}

export default App