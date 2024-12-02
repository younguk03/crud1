import mongoose, { Model, Schema } from "mongoose"

interface IUser {
   name: string
   email: string
}

const userSchema = new Schema<IUser> ({
   name: {type:String, require:true},
   email: {type:String, require:true, unique:true}
})

let User: Model<IUser> 

try {
   User = mongoose.model<IUser>('User')
} catch (error) {
   User = mongoose.model<IUser>('User', userSchema)
   console.error('error',error)
}

export default User