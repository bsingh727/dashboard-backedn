var express=require('express');
var router=express.Router();

router.get('/task', function(req, res, next){
res.send('Welcome task page of PIC');
});
module.exports=router;