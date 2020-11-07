function validatePassword(){
    var password=document.getElementById("password1").value;
    var cpassword=document.getElementById("cpassword").value;
    if(password!=cpassword){
        window.alert("Passwords are not matched!!!");
        return false;
    }
    if (password.length<8){
        alert("Password Must be atleast 8 digit long");
        return false;
    }

    var containNumber=false,containSpecialChar=false;
    var specialSymbols=['@','!','#','$','%','^','&','*'];
    for(var i=0;i<password.length;i++){
        if(password[i]>='0' && password[i]<='9'){
            containNumber=true;
        }
        if(!containSpecialChar){
            for(var j=0;j<specialSymbols.length;j++){
                if(password[i]==specialSymbols[j]){
                    containSpecialChar=true;
                    break;
                }
            }
        }
    }
    if(!containNumber){
        alert("Password Must Contain A Number");
        return false;
    }
    if(!containSpecialChar){
        alert("Password Must Contain A Special Character from ! , @ ,# ,$ ,% ,^ ,& ,*");
        return false;
    }
    return true;
}