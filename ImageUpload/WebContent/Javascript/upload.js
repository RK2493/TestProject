function submitImage()
{
	alert("called")
	var baseUrl = "http://localhost:8080/ImageUpload";
	var myObj = {};
	var formData = new FormData();
	myObj["image_title"] = $("#image_title").val().trim();
	
	if($("#image_upload")[0].files[0]!=undefined)
		formData.append('FileIMG',$("#image_upload")[0].files[0]);
	
	var json = JSON.stringify(myObj)
	formData.append('data',json);
	
	
	
	
	$.ajax({
		type : "POST",
		enctype : 'multipart/form-data',
		url : baseUrl
				+ "/SaveImageData",
		data : formData,
		processData : false,
		contentType : false,
		cache : false,
		success : function(data) {
			alert(data)
		},
		error : function(e) {
			alert("Error : "+ e.responseText);
		}
	});
}





function showimg()
{
//	alert("called show")
	var baseUrl = "http://localhost:8080/ImageUpload";
	var myObj = {};
	
	myObj["image_id"] = $("#image_id").val().trim();
	
	var req= "data="+JSON.stringify(myObj);
//	alert(req)
	
	var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
//	      alert(this.responseText);
	      var resp= this.responseText;
	      var resp_parsed= JSON.parse(resp);
	      
	      alert(resp_parsed["img"])
	      document.getElementById("img_tag").src = "data:image/png;base64," + resp_parsed["img"];
	    }
	  };
	  xhttp.open("POST", "ShowImageData", true);
	  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	  xhttp.send(req);
}