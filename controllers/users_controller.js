const User=require('../models/user');

//user profile page
module.exports.profile=function(req,res){
    res.render('user_profile');
}

//render the sing Up page
module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up');
}

//render sign-in page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in');
}

module.exports.destroySession=function(req,res){
    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}

//create user
module.exports.create=async function(req,res){

    if(req.body.password!=req.body.confirm_password){
        console.log("Please enter again");
        return res.redirect('back');
    }
    const existingUser=await User.findOne({email: req.body.email});

    if(existingUser==null){
        const user=await User.create(req.body);
        return res.redirect('/users/sign-in');
    }
    else{
        console.log("User already present");
        res.redirect('back');
    }
}

//create session
module.exports.createSession=function(req,res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/users/profile');
}