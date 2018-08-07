
//hides or displays the new contact input fields
function displayAddNewContact() {
    var x = document.getElementById("newContact");
	var y = document.getElementById("editContact");
    	if (x.style.display === "none") {
        	x.style.display = "block";
        	y.style.display = "none";
    	} 
    	else {
        	x.style.display = "none";
    	}
}

//validates user input format
function validateInput(){

	var alphabet = /^[a-zA-Z]+$/;
	var emailRegex = /\S+@\S+\.\S+/;
	var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	
	var alert_msg="";
	
	var fnameVal = $("#fname").val();
	var lnameVal = $("#lname").val();
	var emailVal = $("#email").val();
	var phoneVal = $("#phone").val();
		
	if (emailRegex.test(emailVal) == false || emailVal == ""){
		alert_msg+= "Invalid input for email. Must be in the correct email format\n";
		document.getElementById("email").value = "";
	} 	

	if (alphabet.test(fnameVal) == false || fnameVal == ""){
		alert_msg+="Invalid input for first name. No numbers or symbols!\n";
		document.getElementById("fname").value = "";
	} 	

	if (alphabet.test(lnameVal) == false || lnameVal == ""){
		alert_msg+="Invalid input for last name. No numbers or symbols!\n";
		document.getElementById("lname").value = "";
	} 
	
	if (phoneRegex.test(phoneVal) == false || phoneVal == ""){
		alert_msg+="Invalid input for phone. Please enter a valid phone number\n";
		document.getElementById("phone").value = "";
	} 

	if(alert_msg !=""){
		alert(alert_msg);
		return false;
	} 
	
	else{
		return true;
	}
	
}