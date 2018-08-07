

  // Initialize Firebase
    var config = {
    apiKey: "AIzaSyDot9GijVtAcyqICmuYw42zocnystkWPBs",
    authDomain: "contactlist-ef281.firebaseapp.com",
    databaseURL: "https://contactlist-ef281.firebaseio.com",
    projectId: "contactlist-ef281",
    storageBucket: "contactlist-ef281.appspot.com",
    messagingSenderId: "610153509078"
  	};
  	firebase.initializeApp(config);
  	var database = firebase.database();
	var allContacts = database.ref().child('contacts');

	
	var fname= document.getElementById("fname");
	
    //Checks if user input is valid, and adds the new contact to the database
	document.getElementById('submitButton').addEventListener('click',function(){

		if (validateInput()== false){
			console.log('got false');
			return;
		}
	
		console.log('got true');
		
		var contact = {
			firstname: $('#fname').val(), 
			lastname: $('#lname').val(), 
			email: $('#email').val(),
			phone: $('#phone').val(),
			status: $('#status').val()
		};
		allContacts.push(contact);
		firebase.auth().signInAnonymously().then(function() {
   			console.log('Logged in as Anonymous!')	
			
		}).catch(function(error) {
		var errorMessage = error.message;
   		console.log(errorCode);
   		console.log(errorMessage);
		});
		
		var x = document.getElementById("newContact");
		var y = document.getElementById("editContact");
    	if (x.style.display === "none") {
        	x.style.display = "block";
        	y.style.display = "none";
    	} 
    	else {
        	x.style.display = "none";
    	}
    	
    	location.reload();
	});
	
	
	//Listens for new changes in the database. Deletes and edit a contact
	allContacts.once('value',function(cons){
			
		
		cons.forEach(function(firebaseContactReference){
	
			var newContact = firebaseContactReference.val();
			console.log(newContact); 
			var usersList = document.getElementById('users_list');
	        var rowIndex = 1;	
		
			
			var row = usersList.insertRow(rowIndex);
			var button = document.createElement("button");
			button.setAttribute("id", "dBtn");
			button.innerHTML = "Delete";
			
			var button1 = document.createElement("button");
			button1.setAttribute("id", "editBtn");
			button1.innerHTML = "Edit";
			
			var fName = row.insertCell(0);
        	var lName = row.insertCell(1);
        	var email = row.insertCell(2);
        	var phone = row.insertCell(3);
        	var status = row.insertCell(4);
        	var deleteButton = row.insertCell(5);
        	var editButton = row.insertCell(6);
        	
        	fName.appendChild(document.createTextNode(newContact.firstname));
        	lName.appendChild(document.createTextNode(newContact.lastname));
        	email.appendChild(document.createTextNode(newContact.email));
        	phone.appendChild(document.createTextNode(newContact.phone));
        	status.appendChild(document.createTextNode(newContact.status));
        	deleteButton.appendChild(button);
        	editButton.appendChild(button1);
        	
        	//deletes the contact associated with the delete button that's clicked
        	deleteButton.onclick = function() {
        		console.log(firebaseContactReference.key);
        		firebaseContactReference.ref.remove();
        		location.reload();
			}
        	
        	//edit the contact associated with the edit button that's clicked
        	document.getElementById('editBtn').addEventListener('click',function(){
        	
        		//Makes sure edit and new contact divs are not showing at the same time
        		var x = document.getElementById("newContact");
        		var y = document.getElementById("editContact");
    			if (y.style.display === "none") {
        			y.style.display = "block";
        			x.style.display = "none";
    			} 
    			
    	
    			var fnameLbl = document.createElement('label'); 
    			fnameLbl.innerHTML="First Name ";
    			
    			var lnameLbl = document.createElement('label'); 
    			lnameLbl.innerHTML="Last Name ";
    			
    			var emailLbl = document.createElement('label'); 
    			emailLbl.innerHTML="Email ";
    			
    			var phoneLbl = document.createElement('label'); 
    			phoneLbl.innerHTML="Phone ";
    			
    			var statusLbl = document.createElement('label'); 
    			statusLbl.innerHTML="Status";
    			
    			var fnameinput = document.createElement('input'); 
				fnameinput.type = "text"; 
				fnameinput.setAttribute("id", "updateFname");
				fnameinput.value=newContact.firstname;
				
				var lnameinput = document.createElement('input'); 
				lnameinput.type = "text"; 
				lnameinput.setAttribute("id", "updateLname");
				lnameinput.value=newContact.lastname;
				
				var emailinput = document.createElement('input'); 
				emailinput.type = "text"; 
				emailinput.setAttribute("id", "updateEmail");
				emailinput.value=newContact.email;
				
				var phoneinput = document.createElement('input'); 
				phoneinput.type = "text"; 
				phoneinput.setAttribute("id", "updatePhone");
				phoneinput.value=newContact.phone;
				
				var statusoption = document.createElement('select'); 
				statusoption.setAttribute("id", "updateStatus");
				var array = ["Active", "Inactive"];
				for (var i = 0; i < array.length; i++) {
    				var option = document.createElement("option");
    				option.value = array[i];
    				option.text = array[i];
    				statusoption.appendChild(option);
				}
				
				statusoption.value=newContact.status;
  			
  				//Empty out any rows in the table before adding to prevent duplicates
  				var fLblEmpty = document.getElementById("labels");
  				var fInpEmpty = document.getElementById("inputs");
  				var lLblEmpty = document.getElementById("labels2");
  				var lInpEmpty = document.getElementById("inputs2");
  				var eLblEmpty = document.getElementById("labels3");
  				var eInpEmpty = document.getElementById("inputs3");
  				var pLblEmpty = document.getElementById("labels4");
  				var pInpEmpty = document.getElementById("inputs4");
  				var sLblEmpty = document.getElementById("labels5");
  				var sInpEmpty = document.getElementById("inputs5");
  				var bLblEmpty = document.getElementById("labels6");
  				var bInpEmpty = document.getElementById("inputs6");
  				
				while (fLblEmpty.firstChild) {
    				fLblEmpty.removeChild(fLblEmpty.firstChild);
    				fInpEmpty.removeChild(fInpEmpty.firstChild);
    				lLblEmpty.removeChild(lLblEmpty.firstChild);
    				lInpEmpty.removeChild(lInpEmpty.firstChild);
    				eLblEmpty.removeChild(eLblEmpty.firstChild);
    				eInpEmpty.removeChild(eInpEmpty.firstChild);
    				pLblEmpty.removeChild(pLblEmpty.firstChild);
    				pInpEmpty.removeChild(pInpEmpty.firstChild);
    				sLblEmpty.removeChild(sLblEmpty.firstChild);
    				sInpEmpty.removeChild(sInpEmpty.firstChild);
    				bLblEmpty.removeChild(bLblEmpty.firstChild);
    				//bInpEmpty.removeChild(bInpEmpty.firstChild);
				}
  			
    			
  				document.getElementById('labels').appendChild(fnameLbl);
    			document.getElementById('inputs').appendChild(fnameinput);
    			document.getElementById('labels2').appendChild(lnameLbl);
    			document.getElementById('inputs2').appendChild(lnameinput);
    			document.getElementById('labels3').appendChild(emailLbl);
    			document.getElementById('inputs3').appendChild(emailinput);
    			document.getElementById('labels4').appendChild(phoneLbl);
    			document.getElementById('inputs4').appendChild(phoneinput);
    			document.getElementById('labels5').appendChild(statusLbl);
    			document.getElementById('inputs5').appendChild(statusoption);
  			
  			
  				var UpdBtn = document.createElement("button");
				UpdBtn.setAttribute("id", "updB");
				UpdBtn.innerHTML = "Update";
				
    			//document.getElementById('inputs6').appendChild(UpdBtn);
    			document.getElementById('labels6').appendChild(UpdBtn);
    		
    			
    			document.getElementById('updB').addEventListener('click',function(){
    				var data = {
						firstname: $('#updateFname').val(), 
						lastname: $('#updateLname').val(), 
						email: $('#updateEmail').val(),
						phone: $('#updatePhone').val(),
						status: $('#updateStatus').val()
					};
    				var updates = {};
  					updates['/contacts/' + firebaseContactReference.key] = data;

  					firebase.database().ref().update(updates);
  					location.reload();
  				});
  				
			});
		});
			
	});
	
	//Deletes all contacts
	document.getElementById('deleteAll').addEventListener('click',function(){
		if (confirm("Are you sure you want to delete all contact?")) {
			allContacts.remove(function(error) {
				location.reload();
  			});
		}
	});
	
	
	


	
	

