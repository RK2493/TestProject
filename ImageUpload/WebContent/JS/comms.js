var baseUrl = "";
$(document).ready(function() 
{
	baseUrl = localStorage.getItem("baseUrl");
	fetchByPage("1");
});

function clearFields()
{
	$("#type").val("2000").change();
	$("#to").val("2000").change();
	$("#start_date").val("");
	$("#end_date").val("");
	$("#from").val("");
	$("#header").val("");
	$("#message").val("");
	$("#location").val("");
	$("#dept").val("");
	$("#desg").val("");
}

function showModalDialog()
{
	clearFields();
	$("#myModal").modal('show');
}

function hideModalDialog()
{
	$("#myModal").modal('hide');
}

function checkValidation()
{	
	var type = $("#type option:selected").text();
	var to = $("#to option:selected").text();
	var start_date = $("#start_date").val();
	var end_date = $("#end_date").val();
	var from = $("#from").val();
	var header = $("#header").val();
	var message = $("#message").val();
	/*var loc = $("#location").val();
	var dept = $("#dept").val();
	var desg = $("#desg").val();*/
	
	console.log("Type : "+type);
	console.log("to : "+to);
	console.log("start_date : "+start_date);
	console.log("end_date : "+end_date);
	console.log("from : "+from);
	console.log("header : "+header);
	console.log("message : "+message);
	/*console.log("loc : "+loc);
	console.log("dept : "+dept);
	console.log("desg : "+desg);*/
	
	if(type.length == 0)
	{
		$('#error_txt').text("Select appropriate Type");
		return false;
	}
	else if(to.length == 0)
	{
		$('#error_txt').text("Select appropriate To");
		return false;
	}
	else if(start_date.length == 0)
	{
		$('#error_txt').text("Select Start Date");
		return false;
	}
	else if(end_date.length == 0)
	{
		$('#error_txt').text("Select End Date");
		return false;
	}
	else if(from.length == 0)
	{
		$('#error_txt').text("Enter Message From");
		return false;
	}
	else if(header.length == 0)
	{
		$('#error_txt').text("Enter Header");
		return false;
	}
	else if(message.length == 0)
	{
		$('#error_txt').text("Enter Message");
		return false;
	}
	/*else if(loc.length == 0)
	{
		$('#error_txt').text("Enter Location");
		return false;
	}
	else if(dept.length == 0)
	{
		$('#error_txt').text("Enter Department");
		return false;
	}
	else if(desg.length == 0)
	{
		$('#error_txt').text("Enter Designation");
		return false;
	}*/
	else
	{
		$('#error_txt').text("");
		return true;
	}
}

function saveAlertAndComms()
{
	if(checkValidation())
	{
		var type = $("#type option:selected").text();
		var to = $("#to option:selected").text();
		var start_date = $("#start_date").val();
		var end_date = $("#end_date").val();
		var from = $("#from").val();
		var header = $("#header").val();
		var message = $("#message").val();
		var loc = $("#location").val();
		var dept = $("#dept").val();
		var desg = $("#desg").val();
		
		var myObj = {};
		myObj["type"] = type;
		myObj["msg_to"] = to;
		myObj["start_date"] = start_date;
		myObj["end_date"] = end_date;
		myObj["msg_from"] = from;
		myObj["header"] = header;
		myObj["main_msg"] = message;
		myObj["location"] = loc;
		myObj["department"] = dept;
		myObj["designation"] = desg;
		myObj["admin_id"] = "1264894";
		
		var json = JSON.stringify(myObj);
		console.log(json);
		
		var myData = 
		{
			'data':json
		};
		
		$.ajax({
			        type: "POST",
			        url: baseUrl + "/MsgCenterService",
			        data: myData,
			        success: function (data)
			        {
			            console.log("Success : "+data);
			            var jsonObj = JSON.parse(data);
			            if(jsonObj.Status == "true")
						{
			            	alert(jsonObj.message);
			            	hideModalDialog();
						}
			            else if(jsonObj.Status == "false")
			            {
			            	alert(jsonObj.message);
			            }
			        },
			        error: function (e)
			        {
			            console.log("Error : "+ e);
			        }
			    });
	}
}

// ==================  PAGINATION CONTENT =======================

function createTabularStructure(comm_array, totalPages) 
{
	pagObj = $('#pagination').twbsPagination({
		totalPages : totalPages,
		visiblePages : 7,
		onPageClick : function(event, page) 
		{
			console.log("Page Num : "+page);
			fetchByPage(page);
		}
	});
	
	console.log("Cnt of Comms : "+comm_array.length);
	var row = "";
	for (var i = 0; i < comm_array.length; i++)
	{
		row += "<tr>";
		console.log("type : "+comm_array[i]['type']);
		row += "<td style='width: 50px;'>" + comm_array[i]['id']+ "</td>";
		row += "<td style='width: 100px;'>" + comm_array[i]['type'] + "</td>";
		row += "<td style='width: 125px;'>" + comm_array[i]['msg_to'] + "</td>";
		row += "<td style='width: 125px;'>" + comm_array[i]['start_date'] + "</td>";
		row += "<td style='width: 100px;'>" + comm_array[i]['end_date'] + "</td>";
		row += "<td style='width: 100px;'>" + comm_array[i]['msg_from'] + "</td>";
		row += "<td style='width: 100px;'>" + comm_array[i]['header'] + "</td>";
		var v = comm_array[i];
		row += "<td style='width: 100px;'><a id='"+v+"' onclick='selectView("+comm_array[i]+");' style='cursor: pointer;'>View</a></td>";//comm_array[i]['main_msg'] 
		row += "<td><span class='glyphicon glyphicon glyphicon-trash' id='"+ comm_array[i]+ "' style='cursor: pointer;'></span></td>";
		row += "</tr>";
	}
	$("#comms_list_data").html(row);
}

function selectView(val){
	console.log(val +" msg ");
}

function fetchByPage(page_no)
{
	var myObj = {};
	myObj["pgno"] = page_no;
	
	var json = JSON.stringify(myObj);
	console.log(json);
	
	var myData = 
	{
		'data':json
	};
	
	$.ajax({
		        type: "POST",
		        url: baseUrl + "/GetMsgCenter",
		        data: myData,
		        success: function (data)
		        {
		            console.log("Success : "+data);
		            var jsonObj = JSON.parse(data);
		            if(jsonObj.Status == "true")
					{		     
		            	createTabularStructure(jsonObj.message, jsonObj.totalVisiblePages);
					}
		            else if(jsonObj.Status == "false")
		            {
		            	alert(jsonObj.message);
		            }
		        },
		        error: function (e)
		        {
		            console.log("Error : "+ e);
		        }
		    });
}






