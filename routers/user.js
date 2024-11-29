const express=require('express');
const router=express.Router();
const userAuthentication=require('../middleware/userAuthentication');


const userControllers=require('../controllers/userControllers');
router.post('/register',userControllers.registerUser);
router.post('/login',userControllers.loginUser);
router.get('/allUsers',userAuthentication,userControllers.allUsers);

// router.post('/chat',userAuthentication,userControllers);
// router.get('/chat',userAuthentication,userControllers);

// router.post('/createGroup',userAuthentication,userControllers);
// router.put('/reaNameGroup',userAuthentication,userControllers);
// router.put('/groupMenmbersRemove',userAuthentication,userControllers);
// router.put('/menmberseAddInGroup',userAuthentication,userControllers);
// router.put('/deleteGroup',userAuthentication,userControllers);
module.exports=router; 