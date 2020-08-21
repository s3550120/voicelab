//Connect API in AWS to APP.
var API_ENDPOINT =  "https://wij6hcu1ob.execute-api.us-east-1.amazonaws.com/Developer_Stage"



//stores users selected voice into a variable
document.getElementById("sayButton").onclick = function() {

	var inputData = {
		"voice": $('#voiceSelected option:selected').val(),
		"text" : $('#postText').val()
	};

    //generate a unique code
	$.ajax({
	      url: API_ENDPOINT,
	      type: 'POST',
	      data:  JSON.stringify(inputData)  ,
	      contentType: 'application/json; charset=utf-8',
	      success: function (response) {
					document.getElementById("postIDreturned").textContent="Success! Your unique code is: " + response + " Enter it in the search bar below.";
	      },
        
         //display error if no results
	      error: function () {
	          alert("error");
	      }
	  });
}




//calls Gateway API and posts text to DynamoDB and Amazon Polly.

//displays search results stored in DynamoDB
document.getElementById("searchButton").onclick = function() {

	var postId = $('#postId').val();


	$.ajax({
				url: API_ENDPOINT + '?postId='+postId,
				type: 'GET',
				success: function (response) {

					$('#posts tr').slice(1).remove();

	        jQuery.each(response, function(i,data) {

						var player = "<audio controls><source src='" + data['url'] + "' type='audio/mpeg'></audio>"

						if (typeof data['url'] === "undefined") {
	    				var player = ""
						}

						$("#posts").append("<tr> \
								<td>" + data['id'] + "</td> \
								<td>" + data['voice'] + "</td> \
								<td>" + data['text'] + "</td> \
								<td>" + data['status'] + "</td> \
								<td>" + player + "</td> \
								</tr>");
	        });
				},
        //display error if no results
				error: function () {
						alert("error");
				}
		});
}

//Character Counter for text.

document.getElementById("postText").onkeyup = function(){
	var length = $(postText).val().length;
	document.getElementById("charCounter").textContent="Characters: " + length;
}
