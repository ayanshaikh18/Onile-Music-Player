function validate(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    if (email!="test@user.com" || password!="user"){
        document.getElementById("email").focus();
        window.alert("Invalid Credentials");
        return false;
    }else{
        return true;
    }
}