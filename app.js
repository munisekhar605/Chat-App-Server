const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const {chats}=require('./data/data');
const connectDb=require('./config/db');
const user=require('./routers/user');

dotenv.config();
connectDb()
const app=express();
app.use(cors());
app.use(express.json());

app.use('/user',user);

const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`PORT ${PORT}`))
// mongoose
//     .connect('mongodb://localhost:27017')
//     .then(res=>app.listen(3000))
//     .catch(err=>console.log('err'));