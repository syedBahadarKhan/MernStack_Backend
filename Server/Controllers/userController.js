import User from "../Models/UserModel.js"

export const create = async(req, res) =>{
    try {
       const newUser = new User(req.body) 
       const {email} = newUser;
       
       const userExist = await User.findOne({email});
       if(userExist){
        return res.status(400).json({message:"The email is alredy exist"})
       }

       const saveData = await newUser.save()
      //res.status(200).json(saveData)
      res.status(200).json({message: "User Created Succefully"})

    } catch (error) {
     res.status(500).send({errorMessage: error.message}) 
    }
}


export const allUsers = async(req, res) =>{
    try {
        const userData = await User.find()
        if(!userData || userData.length === 0){
        return res.status(404).json({message:"Users data not found"})
    }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).send({errorMessag:error.message})
    }  
}



export const getUserById = async(req, res) =>{
    try {
        const id = req.params.id
        const userData = await User.findById(id)

        if(!userData){
            res.status(404).json({message:"User not found"})
        }
        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json({errorMessage: error.message})
    }
}


export const updateData = async(req, res) =>{
    try {  
    const id = req.params.id
    const userExist = await User.findById(id)
     if(!userExist){
            res.status(404).json({message:"User not found"})
        }
     const updatedData = await User.findByIdAndUpdate(id, req.body, {
        new:true
     })
    //  res.status(200).json(updatedData)
    res.status(200).json({message: "User updated Succefully"})
    } catch (error) {
    res.status(500).json({errorMessage: error.message})
    }
  
}



export const deleteUser = async(req, res) =>{
    try {
        const id = req.params.id
        const userExist = await User.findById(id)
        if(!userExist){
                res.status(404).json({message:"User not found"})
            }
         await User.findByIdAndDelete(id)
        res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
         res.status(500).json({errorMessage: error.message}) 
    }
}