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