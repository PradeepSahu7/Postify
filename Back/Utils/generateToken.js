import jsonwebtoken from "jsonwebtoken"

let generateToken = (user,res)=>{
   
    let token = jsonwebtoken.sign({
        user:{
            id:user._id
        },
    },process.env.SECRET,{expiresIn:"5d"})
    return token;
}
export default generateToken;