import bcrypt from 'bcryptjs'

const users = [
    
{
  name: 'Admin',
  email: 'admin@example.com',
  password: bcrypt.hashSync('123456', 10),
  isAdmin: true
  },

  {
    name: 'obaid', 
    email: 'obaid@example.com',
    password: bcrypt.hashSync('123456', 10),
  },

  {
    name: 'moeez',
    email: 'moeez@example.com',
    password: bcrypt.hashSync('123456', 10),
    },

]



export default users

