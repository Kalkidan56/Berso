const express = require("express");
const { registerBusiness, listBusiness,fetchAll,fetchOne,deleteBusiness,updateOne} = require("../controllers/business");
const router = express.Router();
// const {validateUserSignup,userValidation}=require('../middleware/validation/user')
const { isAuth } = require("../middleware/auth");
router.post("/register-business", registerBusiness);
router.get("/list-business/:categoryId", listBusiness);

router.get('/fetch-all',fetchAll)
router.get('/get-one/:businessId',fetchOne)
router.delete('/delete/:businessId',deleteBusiness)
router.put('/update-one', updateOne)

// router.post('/signin',signin)
// router.post('/create-post',isAuth,(req,res)=>{

//     res.send('Welcome to your secret route')
// })

// router.put('/updateProfile',updateUserProfile)

module.exports = router;
