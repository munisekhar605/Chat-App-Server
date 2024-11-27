const mongoose=require('mongoose');
const chatModel=mongoose.Schema(
    {
        chatName:{type:String,trim:true},
        isGroupChat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
    ],
    latestMassage:{
        typeof:mongoose.Types.ObjectId,
        ref:"Massage",
    },
    groupAdmin:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
    },{
        trimestamps:true
    }
)
const Chat=mongoose.model('Chat',chatModel);
module.exports=Chat;
