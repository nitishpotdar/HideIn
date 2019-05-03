var lineReader = require('line-reader');

/**
 * Send the contents of an HTML page to the client.
 * @param fileName the name of the file containing the HTML page.
 * @param result the HTTP result.
 */
function sendPage(fileName, result)
{
    var html = '';
    
    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last)
        {
            html += line + '\n\n';

            if (last) 
            { 
                result.send(html);
                return false; 
            }
            else
            {
                return true;
            }
        });
}

/**
 * Send the contents of an HTML page to the client
 * with an inserted body text.
 * @param text the body text.
 * @param result the HTTP result.
 */
function sendBody_login(text, result)
{
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <title>HideIn</title>\n'
        + '</head>\n'
        + '<body>\n'
        + '    <h1>Welcome to HideIn, '+ text +' </h1>\n'
        + '<img src="https://images4.alphacoders.com/862/thumb-1920-862732.jpg" width="1024" height="720">'
        + '\n'
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}


/**
 * Send the contents of an HTML page to the client
 * with an inserted body text.
 * @param text the body text.
 * @param result the HTTP result.
 */
function sendBody_signup(text, result)
{
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <title>HideIn</title>\n'
        + '</head>\n'
        + '<body>\n'
        + '    <h1>HideIn,  home for every student!</h1>'
        + '    <h3>'+ text +'</h3>\n'
        + '\n'
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}


/**
 * Send the contents of an HTML page to the client
 * with an inserted body text.
 * @param text the body text.
 * @param result the HTTP result.
 */
function sendBody_postad(text, result)
{
    
    var html = '<!DOCTYPE html>\n'
        + '<html lang="en-US">\n'
        + '<head>\n'
        + '    <meta charset="UTF-8">\n'
        + '    <title>HideIn</title>\n'
        + '</head>\n'
        + '<body>\n'
        + '    <h1>HideIn,  home for every student!</h1>'
        + '    <h3>'+ text +'</h3>\n'
        + '\n'
        + '</body>\n'
        + '</html>\n';
    
    result.send(html);    
}

/* 
 * GET home page.
 */
module.exports.home = function(request, result) 
{
    //sendPage('homepage.html', result);
    //result.render('homepage');
    sendPage('index.html', result);
};

/*
 * GET login fields page.
 */
module.exports.get_login = function(request, result) 
{
    result.render('login', { title:"Login form"});
    //sendPage('login.html', result);
};

/*
 * POST login success page.
 */
module.exports.post_login = function(request, result) 
{
	var uid = request.param('username');
    var pwd  = request.param('password');
    var registeredUsers = [];
    var db = request.db;

    var collection = db.get('usercollection');
	if(request.session.user) {
		if(request.session.user.userName == "admin@hidein.com"){
			result.render('NewCustomerMenu',{admin:"admin"})
		}
		else{
			result.render('NewCustomerMenu');
		}	
	}
	else {
    collection.find({userName:uid,password:pwd},function(e,docs){
    if(docs != ""){
        var newUser = {"userName": uid};
        console.log(newUser);
        request.session.user = newUser;
        if(uid == "admin@hidein.com"){
        	result.render('NewCustomerMenu',{admin:"admin"});
        }
        else{
        	result.render('NewCustomerMenu');
        }
    }
    else{
        result.render('login',{message: "Invalid crdentials!"});
    }
    });
	}
    var text = uid;
};

/*
 * GET sign up fields page.
 */
module.exports.get_signup = function(request, result) 
{
    result.render('signup');
    //sendPage('signup.html',result);
};

/*
 * POST sign up success page.
 */
module.exports.post_signup = function(request, result) 
{
	var firstName = request.param('firstName');
    var lastName  = request.param('lastName');
    var emailId  = request.param('emailId');
    var phoneNumber  = request.param('phoneNumber');
    var password = request.param('password');
    //console.log(firstName + lastName);
    var db = request.db;
    
    var collection = db.get('usercollection');
    
    collection.insert({"userName":emailId,
                        "email":emailId,
                        "firstName":firstName,
                        "lastName":lastName,
                        "phoneNumber":phoneNumber,
                        "password":password},
                        function(err, doc)
                        {
                            if(err) {
                                result.redirect('signup.html');
                            }
                            else {
                                //sendPage('homepage.html', result);
                                sendPage('index.html', result);
                            }
                        });
};

/*
 * GET sign up fields page.
 */
module.exports.get_postad = function(request, result) 
{
    sendPage('post-ad.html',result);
};

/*
 * POST sign up success page.
 */
module.exports.post_postad = function(request, result) 
{   
    var uId = request.session.user.userName;
    var available_from = request.param('available_from');
    var available_till  = request.param('available_till');
    var rent  = request.param('rent');
    var location  = request.param('location');
    var description = request.param('description');
    var amenities = "";
    if(request.body.parking)
    {
        amenities += "Parking";
        amenities += ",";
    }
    if(request.body.swimmmingpool)
    {
        amenities += "Swimmming Pool";
        amenities += ", ";
    }
    if(request.body.gym)
    {
        amenities += "Gym";
        amenities += ", ";
    }
    if(request.body.airconditioner)
    {
        amenities += "Air Conditioner";
        amenities += ", ";
    }
    if(request.body.washerdryer)
    {
        amenities += "Washer/Dryer";
        amenities += ",";
    }
    var db = request.db;
    var type = request.body.types;
    switch(type){
        case "apartment":
            var collection = db.get('apartmentcollection');
            break;
        case "room":
            var collection = db.get('roomcollection');
            break;
        case "roommate":
            var collection = db.get('roommatecollection');
            break;
        case "sublet":
            var collection = db.get('subletcollection');
            break;
        case "tenant":
            var collection = db.get('tenantcollection');
            break;
    }

    collection.insert(
        {"userName" : uId,
        "AvailableFrom" : available_from,
        "AvailableTill" : available_till,
        "Rent" : rent,
        "Location" : location,
        "Description" : description,
        "Amenities" : amenities},function(err, doc){});

    var success = 'Ad post successful!';
    sendBody_postad(success,result);
    
};

module.exports.add_listing = function(request, result)
{
    var uId = request.body.userName;
    var available_from = request.body.AvailableFrom;
    var available_till  = request.body.AvailableTill;
    var rent  = request.body.Rent;
    var location  = request.body.Location;
    var description = request.body.Description;
    var amenities = request.body.Amenities;
    
    var db = request.db;
    var type = request.params.id;
    switch(type){
        case "apartment":
            var collection = db.get('apartmentcollection');
            break;
        case "room":
            var collection = db.get('roomcollection');
            break;
        case "roommate":
            var collection = db.get('roommatecollection');
            break;
        case "sublet":
            var collection = db.get('subletcollection');
            break;
        case "tenant":
            var collection = db.get('tenantcollection');
            break;
    }
    collection.insert({ "userName":uId,
                        "AvailableFrom":available_from,
                        "AvailableTill":available_till,
                        "Rent":rent,
                        "Location":location,
                        "Description":description,
                        "Amenities":amenities},
                        function(err, doc){});
    result.status(200).send('Ad post is successful!');
};

module.exports.get_apartment_listings = function(request, result) 
{
    var db = request.db;
    var collection = db.get('apartmentcollection');
    collection.find({},{},function(err, doc)
    {
        result.json(doc);
    });
};

module.exports.get_room_listings = function(request, result) 
{
    var db = request.db;
    var collection = db.get('roomcollection');
    collection.find({},{},function(err, doc)
    {
        result.json(doc);
    });
};

module.exports.get_roommate_listings = function(request, result) 
{
    var db = request.db;
    var collection = db.get('roommatecollection');
    collection.find({},{},function(err, doc)
    {
        result.json(doc);
    });
};

module.exports.get_sublet_listings = function(request, result) 
{
    var db = request.db;
    var collection = db.get('subletcollection');
    collection.find({},{},function(err, doc)
    {
        result.json(doc);
    });
};

module.exports.get_tenant_listings = function(request, result) 
{
    var db = request.db;
    var collection = db.get('tenantcollection');
    collection.find({},{},function(err, doc)
    {
        result.json(doc);
    });
};


module.exports.loggedIn = function(req, res, next)
{
   console.log("Checking if logged in:");
   if (req.session.user)
   {
       // Proceed if the user is logged in.
       console.log("Logged in: "); 
       console.log(req.session.user);
       next(); 
   } 
   else 
   {
       console.log("Not logged in");
       res.send("You must first log in.");
   }
};



module.exports.post_logout = function(request, result)
{
    request.session.destroy(function(){
      console.log("user logged out.")
   });
    //console.log(request.session.user);
   //result.render('login');
    sendPage('index.html',result)

};

module.exports.post_change_password = function(request, result)
{
    result.render('change_password');

};

module.exports.post_delete_account = function(request, result)
{
    result.render('delete_account');
};

module.exports.post_confirm_delete_account = function (request, result) 
{
    var currentPassword = request.body.currentPassword;
    var userId = request.session.user.userName;
    var db = request.db;
    var collection = db.get('usercollection');

    collection.find({userName:userId,password:currentPassword},function(e,docs){
    if(docs != ""){

        collection.remove({'userName':userId});
        result.render('homepage',{message: "Account Deleted successfully!"});
    }
    else {
        result.render('customer-menu',{message: "Incorrent Current Password!"});
    }
});
};

module.exports.post_delete_customer_account = function (request, result)
{
    var uId = request.params.id;
    var secretKey = request.body.secretKey;
    var db = request.db;
    var collection = db.get('usercollection');
    console.log(uId);
    collection.find({userName:uId},function(e,docs){
    if(docs != "" && secretKey == "Ssh..Koi Hai!"){

        collection.remove({'userName':uId});
        result.status(200).send('Account deleted successfully!');
        //result.render('homepage',{message: "Account Deleted successfully!"});
    }
    else {
        result.status(404).send('Invalid secret Key');
        //result.render('customer-menu',{message: "Incorrect Current Password!"});
    }
});
};

module.exports.post_confirm_change_password = function(request, result)
{
    var currentPassword = request.body.currentPassword;
    var userId = request.session.user.userName;
    var newPassword = request.body.newPassword;

    console.log("Session user" + userId);
    var db = request.db;

    var collection = db.get('usercollection');

    collection.find({userName:userId,password:currentPassword},function(e,docs){
    if(docs != ""){

        collection.update({'password':currentPassword},{$set:{'password': newPassword}});
        request.session.destroy(function(){
  	      console.log("user logged out.")
  	   });
        result.render('login',{message: "Password changed successfully!"});
    }
    else {
        result.render('NewCustomerMenu',{message: "Incorrect Current Password"});
    }
});
};

module.exports.post_apartment_listings = function(request, result)
{
    var db = request.db;
    var collection = db.get('apartmentcollection');
    var test;
    collection.find({},{},function(err, doc)
    {
        console.log(doc);
        result.render("customer-menu",{apartment_listings: doc});
    });
    
};

module.exports.post_room_listings = function(request, result)
{
    var db = request.db;
    var collection = db.get('roomcollection');
    var test;
    collection.find({},{},function(err, doc)
    {
        result.render("customer-menu",{room_listings: doc});
    });
};

module.exports.post_roommate_listings = function(request, result)
{
    var db = request.db;
    var collection = db.get('roommatecollection');
    var test;
    collection.find({},{},function(err, doc)
    {
        result.render("roommate-menu",{roommate_listings: doc});
    });
};

module.exports.post_tenant_listings = function(request, result)
{
    var db = request.db;
    var collection = db.get('tenantcollection');
    var test;
    collection.find({},{},function(err, doc)
    {
        result.render("customer-menu",{tenant_listings: doc});
    });
};

module.exports.post_sublet_listings = function(request, result)
{
    var db = request.db;
    var collection = db.get('subletcollection');
    var test;
    collection.find({},{},function(err, doc)
    {
        result.render("customer-menu",{sublet_listings: doc});
    });
};

module.exports.post_advertisement = function (request, result) 
{
    sendPage('post-ad.html',result);
	//result.render("post-ad",{message: "Post Advertisement!"});
};

module.exports.put_update_listing = function(request, result)
{
    var uId = request.body.userName;
    var available_from = request.body.AvailableFrom;
    var available_till  = request.body.AvailableTill;
    var rent  = request.body.Rent;
    var location  = request.body.Location;
    var description = request.body.Description;
    var amenities = request.body.Amenities;
    
    var db = request.db;
    var id = request.params.id;
    console.log(id);
    var collection = db.get('apartmentcollection');
    
    collection.update({"userName": id},
        {$set:{ "userName":uId,
                        "AvailableFrom":available_from,
                        "AvailableTill":available_till,
                        "Rent":rent,
                        "Location":location,
                        "Description":description,
                        "Amenities":amenities}},
                        function(err, doc){
                            if(err) {
                                result.status(404).send("Entry does not exist!");
                            }
                            else {
                                result.status(200).send('Ad update is successful!');
                            }
                        });
};

module.exports.post_searchApartments = function (request, result) 
{
	var location = request.param('search_apartments');
	console.log('Location '+location);
	var db = request.db;

    var collection = db.get('apartmentcollection');

    collection.find({apartmentAddress:location},function(e,docs){
    if(docs != ""){
        console.log(docs);
        result.render("customer-menu",{apartment_listings: docs});
    }
    else{
    	var db = request.db;
        var collection = db.get('apartmentcollection');
        collection.find({},{},function(err, docs)
        {
        	result.render('customer-menu',{apartment_listings: docs});
        });
    }
    });
};

module.exports.post_searchRoommates = function (request, result) 
{
	var location = request.param('search_roommates');
	console.log('Location '+location);
	var db = request.db;

    var collection = db.get('roommatecollection');

    collection.find({apartmentAddress:location},function(e,docs){
    if(docs != ""){
        console.log(docs);
        result.render("roommate-menu",{roommate_listings: docs});
    }
    else{
    	var db = request.db;
        var collection = db.get('roommatecollection');
        collection.find({},{},function(err, docs)
        {
        	result.render('roommate-menu',{roommate_listings: docs});
        });
        
    }
    });
	
};

module.exports.get_apartment_ad = function(request, result)
{
	console.log('Apartment posting!');
	sendPage('post_apartment.html',result);
}

module.exports.get_roommate_ad = function(request, result)
{
	console.log('Roommate posting!');
	sendPage('post_roommate.html',result);
}

module.exports.post_apartment_ad = function(request, result)
{
	console.log('Post apartment');
	var userId = request.session.user.userName;
	console.log(userId);
	var apartmentName= request.param('apartmentName');
    var apartmentAddress  = request.param('apartmentAddress');
    var noOfBedrooms  = request.param('noOfBedrooms');
    var noOfBaths  = request.param('noOfBaths');
    var expectedRent = request.param('expectedRent');
    var availableFrom = request.param('availableFrom');
    var availableTill = request.param('availableTill');
    var message = request.param('message');
    var mealPreference = request.param('mealPreference');
    var petFriendly = request.param('petFriendly');
    var contactName = request.param('contactName');
    var emailId = request.param('emailId');
    var phoneNumber = request.param('phoneNumber');

    var db = request.db;
    var collection = db.get('apartmentcollection');
    collection.insert({"userName":userId,
                        "apartmentName":apartmentName,
                        "apartmentAddress":apartmentAddress,
                        "noOfBedrooms":noOfBedrooms,
                        "noOfBaths":noOfBaths,
                        "expectedRent":expectedRent,
                        "availableFrom":availableFrom,
                        "availableTill":availableTill,
                        "message":message,
                        "mealPreference":mealPreference,
                        "petFriendly":petFriendly,
                        "contactName":contactName,
                        "emailId":emailId,
                        "phoneNumber":phoneNumber
                        },
                        function(err, doc)
                        {
                            if(err) {
                                //result.redirect('NewCustomerMenu.html');
                                result.render('NewCustomerMenu');
                            }
                            else {
                            	result.render('NewCustomerMenu');
                                //sendPage('NewCustomerMenu.html', result);
                            }
                        });
	//sendPage('NewCustomerMenu.html', result);
}

module.exports.post_roommate_ad = function(request, result)
{
	console.log('Post roommate');
	var userId = request.session.user.userName;
	console.log(userId);
	var apartmentName= request.param('apartmentName');
    var apartmentAddress  = request.param('apartmentAddress');
    var noOfBedrooms  = request.param('noOfBedrooms');
    var noOfRoommates  = request.param('noOfRoommates');
    var noOfBaths  = request.param('noOfBaths');
    var expectedRent = request.param('expectedRent');
    var availableFrom = request.param('availableFrom');
    var availableTill = request.param('availableTill');
    var availability = request.param('availability');
    var message = request.param('message');
    var mealPreference = request.param('mealPreference');
    var petFriendly = request.param('petFriendly');
    var contactName = request.param('contactName');
    var emailId = request.param('emailId');
    var phoneNumber = request.param('phoneNumber');

    var db = request.db;
    var collection = db.get('roommatecollection');
    collection.insert({"userName":userId,
                        "apartmentName":apartmentName,
                        "apartmentAddress":apartmentAddress,
                        "noOfBedrooms":noOfBedrooms,
                        "noOfRoommates":noOfRoommates,
                        "noOfBaths":noOfBaths,
                        "expectedRent":expectedRent,
                        "availableFrom":availableFrom,
                        "availableTill":availableTill,
                        "availability":availability,
                        "message":message,
                        "mealPreference":mealPreference,
                        "petFriendly":petFriendly,
                        "contactName":contactName,
                        "emailId":emailId,
                        "phoneNumber":phoneNumber
                        },
                        function(err, doc)
                        {
                            if(err) {
                                //result.redirect('NewCustomerMenu.html');
                                result.render('NewCustomerMenu');
                            }
                            else {
                                //sendPage('NewCustomerMenu.html', result);
                                result.render('NewCustomerMenu');
                            }
                        });
};

module.exports.post_editListing = function(request,result){
	var userId = request.session.user.userName;
	var db = request.db;
    var collection = db.get('apartmentcollection');
    var apts1,apts2;
    collection.find({userName: userId},{},function(err, docs)
    {
    	apts1=docs;
    });
    var collection = db.get('roommatecollection');
    collection.find({userName: userId},{},function(err, docs)
    {
    	apts2=docs;
    	result.render('edit-menu',{apartment_listings: apts1, roommate_listings: apts2});
    });
};

module.exports.post_deleteListing = function(request, result){
	var db = request.db;
    var collection = db.get('apartmentcollection');
    var apts1,apts2;
    collection.find({},{},function(err, docs)
    {
    	apts1=docs;
    });
    var collection = db.get('roommatecollection');
    collection.find({},{},function(err, docs)
    {
    	apts2=docs;
    	result.render('adminlisting',{apartment_listings: apts1, roommate_listings: apts2});
    });
};

module.exports.post_delete_listing = function(request, result){

	var userId = request.session.user.userName;
	var mongodb = require('mongodb').ObjectID;
	var db = request.db;
	var id1 = request.body.delete1;
	var id2 = request.body.delete2;
	console.log(id1);
	console.log(id2);	
	if (typeof id1 !== 'undefined') {
		id1=id1.slice(1,25);
		var collection = db.get('apartmentcollection');
	   collection.remove({_id: new mongodb.ObjectID(id1)}, function(err, results) {
	       if (err){
	         console.log("failed");
	         throw err;
	       }
	       else{
	       console.log("success");
	       }
	    });
	    result.render('NewCustomerMenu');
	}
	if (typeof id2 !== 'undefined') {
		//console.log(id2);
		id2=id2.slice(1,25);
		var collection = db.get('roommatecollection');
	   collection.remove({_id: new mongodb.ObjectID(id2)}, function(err, results) {
	       if (err){
	         console.log("failed");
	         throw err;
	       }
	       else{
	       console.log("success");
	       }
	    });
	    result.render('NewCustomerMenu');
	}
};

module.exports.post_admin_delete_listing = function(request, result){

	var userId = request.session.user.userName;
	var mongodb = require('mongodb').ObjectID;
	var db = request.db;
	var id3 = request.body.delete3;
	var id4 = request.body.delete4;
	console.log(id3);
	console.log(id4);
	
	
	if (typeof id3 !== 'undefined') {
		//console.log(id2);
		id3=id3.slice(1,25);
		var collection = db.get('apartmentcollection');
	   collection.remove({_id: new mongodb.ObjectID(id3)}, function(err, results) {
	       if (err){
	         console.log("failed");
	         throw err;
	       }
	       else{
	       console.log("success");
	       }
	    });
	    result.render('NewCustomerMenu',{admin: "admin"});
	}
	if (typeof id4 !== 'undefined') {
		//console.log(id2);
		id4=id4.slice(1,25);
		var collection = db.get('roommatecollection');
	   collection.remove({_id: new mongodb.ObjectID(id4)}, function(err, results) {
	       if (err){
	         console.log("failed");
	         throw err;
	       }
	       else{
	       console.log("success");
	       }
	    });
	    result.render('NewCustomerMenu',{admin:"admin"});
	}
};

module.exports.post_dataAnalytics = function(request, result){
	sendPage('admin_view.html',result);
}


