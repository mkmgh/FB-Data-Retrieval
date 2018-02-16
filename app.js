$( document ).ready(function() {

    function getFacebookInfo(){

        var myFacebookToken = $("#tkn").val();
        $.ajax('https://graph.facebook.com/me?fields=id,name,birthday,quotes,cover,education,posts{likes,comments,source,shares,actions,full_picture,type,created_time,message,story,name},email,hometown,picture.height(300).width(300),work,gender,languages,interested_in,family&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);

                    console.log(typeof(response));

             //fields for basic details div

                    $("#name").text(response.name);
        
                    $("#birthday").text(response.birthday);
		    $("#interIn").text(response.interested_in);
               
		   var lang = $.map(response.languages,function(index,value){
		 	return index.name;					   
			});
		   $("#lang").text(lang);
                   $("#gen").text(response.gender);

           //fields for about div
                    $("#email").text(response.email);
                    $("#quotes").text(response.quotes);
                    
                  
           //fields for profile photo
     
            $("#profilePhoto").attr("src", "" + response.picture.data.url + "");

           
           //fields for Education Div


       var eduSchool=[],eduCollege=[];
       var eduIndex = $.map(response.education, function (i,val) {
                        return i;
                    });
            
       $.each(eduIndex, function (i,val) {
                
                  if((response.education[i].type)=="High School"&&(response.education[i].type)!=undefined){
                      eduSchool[i]=response.education[i].school.name;
                      $("#eduMainSchool").append("<div>"+eduSchool[i]+"</div>");
                  }else if((response.education[i].type)=="College"&&(response.education[i].type)!=undefined){
                      eduCollege[i]=response.education[i].school.name;
                      $("#eduMainCollege").append("<div>"+eduCollege[i]+"</div>");
                  }else{"  N/A  "}	 
               

         
      }); 

 
  


 
          //fields for Work Div
              if(response.work[0].employer!=undefined){
                  $("#companyName").text(response.work[0].employer.name);
              }else{"N/a"}
              if(response.work[0].position!=undefined){
                  $("#positionName").text(response.work[0].position.name);
              }
	  //fields for Posts Div


       var postMessage=[],postStory=[],postLikes=[],postFullPicture=[];


              //returning all index
		var postIndex = $.map(response.posts.data, function (i,val) {
                        return i;
                    });
                  
		//storing messages in postMessage array

               $.each(postIndex, function (i,val) {

                      if((postIndex[i].message)!=undefined){
                      postMessage[i] = postIndex[i].message;
		      }
                      else{postMessage[i] ="undefined message"};

                }); 
               


		//storing story in postStory array
               $.each(postIndex, function (i,val) {

                      if((postIndex[i].story)!=undefined){
                      postStory[i] = postIndex[i].story;
		      }
                      else{postStory[i] =response.name+" has updated status."};

                }); 
               
             
         
             //storing the likes and number in postLikes array
               $.each(postIndex, function (i,val) {

                    if((postIndex[i].likes)!=undefined){
                      postLikes[i] = "Liked by "+postIndex[i].likes.data[0].name + " and " + postIndex[i].likes.data.length + " more. ";
		    }else{"  N/A  "}

                }); 
               

            //storing fullpictures in postFullPicture array 

 		$.each(postIndex, function (i,val) {

                    if((postIndex[i].full_picture)!=undefined){
                      postFullPicture[i] = postIndex[i].full_picture;
		    }else{"  N/A  "}

                }); 

      

//To print all post data

             $.each(postIndex, function (i,val) {

                   $("#postMain").append(

			
	"<div style='background-color:white;border:solid black 1px;'>"+

        "<div id='linkPostStory'><b>"+postStory[i]+"</b></div><br>"+
        "<div id='linkPostMessage'>"+postMessage[i]+"</div><br>"+

        "<div style='background-color:gray; padding-left:5px;padding-right:5px'>"+
                                   "<img class='img-responsive center-block img-height' id='fullPicture' style='margin: 0 auto' src='"+postFullPicture[i]+"'>"+
        "</div><br>"+
          
        "<div id='linkPostLikes'>"+postLikes[i]+"</div><br>"+	           
         
         "<div><span><i class='far fa-thumbs-up'></i><a href='"+postIndex[i].actions[0].link+"'>Like</a></span>  <span> <i class='fas fa-comment'></i><a href='"+postIndex[i].actions[0].link+"'>Comment</a></span> <span><i class='fas fa-share-square'></i> <a href='"+postIndex[i].actions[0].link+"'>Share</a></span></div><br>"+



        "</div><hr>"
                     
                    );
             
            
                }); 
            






		},

                timeout: 5000, // keeping the timeout for 1 sec 
                beforeSend: function () { //before sending the request to api the loader loads and displays on screen
                    $('.loader').delay(4000).show();
                   // $(".form-group").hide();

                },
                complete: function () {
                    $('.loader').delay(4000).hide(); // after getting the request hide the loader on screen 


                },
                error: function (req, status, error) { // error function for showing the error on console and giving warining to users via alert
                    console.log('Error occured', status, error);
                    alert("Token is  either not inserted or it is expired.");
                }










            }//end argument list 



        );// end ajax call 

    alert("Please click on fields to get Information");
    }// end get facebook info
  
    $(".loader").hide();
  
    $("#basicdetails").hide();	
    $("#aboutDiv").hide();
    $("#eduDiv").hide();
    $("#workDiv").hide();
    $("#postsDiv").hide();
    $("#famDiv").hide();
    $("#profileDiv").hide();

    $("#facebookBtn").on('click',getFacebookInfo);

    
    $("#linkBasicDetails").on('click',function(){
	$("#basicdetails").show(1000);
         $("#aboutDiv").hide();
         $("#eduDiv").hide();
         $("#workDiv").hide();
         $("#postsDiv").hide();
         $("#famDiv").hide();
         $("#profileDiv").hide();
	});


   $("#linkAbout").on('click',function(){
        $("#aboutDiv").show(1000);
        $("#basicdetails").hide();	
        $("#eduDiv").hide();
	$("#workDiv").hide();
        $("#postsDiv").hide();
        $("#famDiv").hide();
        $("#profileDiv").hide();
	});
   
    $("#linkFam").on('click',function(){
        $("#famDiv").show(1000);
        $("#aboutDiv").hide();
        $("#basicdetails").hide();	
        $("#eduDiv").hide();
	$("#workDiv").hide();
        $("#postsDiv").hide();
 	$("#profileDiv").hide();
	});


    $("#linkEdu").on('click',function(){
        $("#eduDiv").show(1000);
        $("#aboutDiv").hide();
        $("#basicdetails").hide();	
	$("#workDiv").hide();
        $("#postsDiv").hide();
        $("#famDiv").hide();
	$("#profileDiv").hide();
	});

    $("#linkWork").on('click',function(){
        $("#workDiv").show(1000);
        $("#eduDiv").hide();
        $("#aboutDiv").hide();
        $("#basicdetails").hide();
        $("#postsDiv").hide();	
	$("#famDiv").hide();
	$("#profileDiv").hide();
	});

    $("#linkPosts").on('click',function(){
        $("#postsDiv").show(1000);
        $("#workDiv").hide();
        $("#eduDiv").hide();
        $("#aboutDiv").hide();
        $("#basicdetails").hide();	
	$("#famDiv").hide();
	$("#profileDiv").hide();
	});

    $("#linkProfile").on('click',function(){
	$("#profileDiv").show(1000);
        $("#postsDiv").hide();
        $("#workDiv").hide();
        $("#eduDiv").hide();
        $("#aboutDiv").hide();
        $("#basicdetails").hide();	
	$("#famDiv").hide();
	});



  });







