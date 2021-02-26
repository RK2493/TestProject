/**
 * 
 */
var data = "";

$(document).ready(function() {
	console.log("Here");
	//var id = $('#pageno').val();
	empLoadPage(0);	
});

function empLoadPage(id) {
	//setting id as default paramater
	id = id || 1;
	console.log("Entry");
	console.log("In load Page");
	$.getJSON("/Mobitrail_HRMS/EmployeeData?id="+id+"&check=retrive", 
			
		function(data, textStatus, jqXHR) {
			console.log("In data"+data)
			loadGrid(data,id);
	});
}

function loadGrid(data,id){
	var tBody = $("#myTable");
	tBody.empty();
	console.log(data.length);
	console.log(data);
	
	var page_count = data[data.length-1].PageCount;
	var no_of_records = data[data.length-1].NoOfRecords;

	//console.log("Total Page Size is ==>"+ total_records);
	
	window.pagObj = $('.pagination').twbsPagination({
        totalPages: page_count,
        visiblePages: 5,
        onPageClick: function (event, page) {
        	empLoadPage(page);
            console.info(page + ' (from options)');
        }
    })
	
	var cal = (id-1)*no_of_records;
	console.log("ID is "+id);
	console.log("calculated valus is "+cal);

	for (var i = 0; i < data.length - 1; i++) {
		var row = $("<tr>");
		row.append($("<td style='text-align:left;'>").text(cal + (i + 1)));
		row.append($("<td style='text-align:left;'>").text(data[i].empid));
		row.append($("<td style='text-align:left;'>").text(data[i].fname+" "+data[i].mname+" "+data[i].lname));
		row.append($("<td style='text-align:left;'>").text(data[i].gender));
		row.append($("<td style='text-align:left;'>").text(data[i].mobile1));
		row.append($("<td style='text-align:left;'>").text(data[i].bloodgrp));
		var address="";
		if(data[i].add_resedential_lin1 != "")
			address += data[i].add_resedential_lin1;
		if(data[i].add_resedential_lin2 != "")
			address += ", "+data[i].add_resedential_lin2;
		if(data[i].add_resedential_state != "")
			address += ", "+data[i].add_resedential_state;
		if(data[i].add_resedential_city != "")
			address += ", "+data[i].add_resedential_city;
		if(data[i].add_resedential_pincode != "")
			address += ", "+data[i].add_resedential_pincode;
		
		row.append($("<td style='text-align:left;'>").text(address+".")); 
		/*data[i].empid    (this.id,"+ i+ ","+data[i]+")  onclick='displayemp(this.id)'*/
		
		row.append($("<td><div style='text-align:center;'><a href='#'  style='cursor: pointer;'  onclick='displayemp("+data[i].empid+")' data-toggle='modal' data-target='#viewModal'>View</a></div>"));//<a data-toggle='modal' href='#ViewModal' id='1' style='cursor: pointer;'>View</a> </div>"));
		row.append($("<td><div style='text-align:center;'><img src='Images/delete.png'  style='cursor: pointer;' onclick='deleteeEmployeeDetails("+data[i].empid+")' /></div>"));
		
		/*row.append($( "<td style='text-align:center;'><a href='#' id='"+ i+ "' style='cursor: pointer;'  onclick='displayemp(this.id,"+data[i]+")' data-toggle='modal' data-target='#viewModal'>View</a>"));
		row.append($("<td style='text-align:center;'><img src='Images/delete.png' id='"+ i+ "' class='mousechange' style='cursor: pointer;' onclick='deleteeEmployeeDetails(this.id  )'>"));*/
		tBody.append(row);
	}
};

function displayemp(data1) {
	
	$.getJSON("/Mobitrail_HRMS/EmployeeData?id="+data1+"&check=display", 
			function(data, textStatus, jqXHR) {
				console.log("In data"+data+"  "+data.length+"  "+data.empid);
				for (var i = 0; i < data.length; i++) {
					console.log("In data emp display " + data[i].empid);
					document.getElementById('view_eId').value = data[i].empid;
					document.getElementById('view_ename').value = data[i].fname;
					document.getElementById('view_from_date').value = data[i].gender;
					document.getElementById('view_mobile').value = data[i].mobile1;
					document.getElementById('view_gender').value = data[i].bloodgrp;
		}
		});
}
 
function deleteeEmployeeDetails(data1) {
	console.log("Delete "+data1);
	$.getJSON("/Mobitrail_HRMS/EmployeeData?id="+data1+"&check=delete", 
			function(data, textStatus, jqXHR) {
				console.log("In data detete    "+data+"  "+data.length+"  "+data[data.length-2].status);
				
//				alert("Delete Successfully");
//				location.reload();
		});
	
//		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//
//			console.log(xmlhttp.responseText);
//			
//		}

	}

//	if (confirm("Do you want to delete the field?") == true) {
//		xmlhttp.send(params);
//
//		console.log("Leaving Console");
//
//	}



function viewEmployeeDetails(id, i,data) {

	console.log("viewEmployeeDetails id " + id + " i-->" + i);
	console.log("RowId --->>> " + data.empid);
	/*RowId.value = resText[i].id;
	if (data[i].insta_pay_biller_id == null
			|| data[i].insta_pay_biller_id == "") {
		document.getElementById("biller_id1").innerHTML = " - ";

	} else {
		document.getElementById("biller_id1").innerHTML = resText[i]["insta_pay_biller_id"];
	}

	if (resText[i]["register_and_pay_biller_id"] == null
			|| resText[i]["register_and_pay_biller_id"] == "") {
		document.getElementById("register_biller_id1").innerHTML = " - ";
	} else {

		document.getElementById("register_biller_id1").innerHTML = resText[i]["register_and_pay_biller_id"];
	}

	if (resText[i]["biller_name"] == null || resText[i]["biller_name"] == "") {
		document.getElementById("biller_name1").innerHTML = "<input id='biller_name_update' style='width: 70%;text-align:left;padding-left:5px;' type='text' value=''></input>";
	} else {
		document.getElementById("biller_name1").innerHTML = "<input id='biller_name_update'  style='width: 70%;text-align:left;padding-left:5px;' type='text' value='"
				+ resText[i]["biller_name"] + "'></input>";
		// document.getElementById("biller_name1").innerHTML =
		// resText[i]["biller_name"];
	}
	console.log("insta_pay_biller_id------>>>>"
			+ resText[i]["insta_pay_biller_id"]);
	document.getElementById("billeridhidden").value = resText[i]["insta_pay_biller_id"];
	document.getElementById("billeridhiddenregisterid").value = resText[i]["register_and_pay_biller_id"];
	console.log("insta_pay_biller_ideeeee------>>>>"
			+ document.getElementById("billeridhidden").value);
	console.log("billeridhiddenregisterid------>>>>"
			+ document.getElementById("billeridhiddenregisterid").value);
	if (resText[i]["type_of_biller"] == null
			|| resText[i]["type_of_biller"] == "") {
		document.getElementById("biller_type1").innerHTML = " - ";
	} else {
		document.getElementById("biller_type1").innerHTML = resText[i]["type_of_biller"];
	}
	if (resText[i]["category"] == null || resText[i]["category"] == "") {
		document.getElementById("category1").innerHTML = " - ";
	} else {
		document.getElementById("category1").innerHTML = resText[i]["category"];
	}
	if (resText[i]["bbps"] != null && resText[i]["bbps"] != "") {
		if (resText[i]["bbps"] == "N") {
			document.getElementById('activebbps').checked = 'true';
			document.getElementById('inactivebbps').checked = 'false';
			// document.getElementById("bbps").innerHTML =" No ";
		} else if (resText[i]["bbps"] == "Y") {
			document.getElementById('inactivebbps').checked = 'true';
			document.getElementById('activebbps').checked = 'false';
			// document.getElementById("bbps").innerHTML =" Yes ";
		}
	} else {
		document.getElementById("bbps").innerHTML = " - ";
	}
	document.getElementById("key_authenticaotrs_for_bill_fetch1").innerHTML = "";
	document.getElementById("remarks1").innerHTML = "";
	document.getElementById("biller_id_image").innerHTML = resText[i]["insta_pay_biller_id"];
	document.getElementById("filePicker").value = "";
	if (resText[i]["location_insta"] == null
			|| resText[i]["location_insta"] == "") {
		document.getElementById("remarks1").innerHTML = " - ";
	} else {
		document.getElementById("remarks1").innerHTML = resText[i]["location_insta"];
	}

	// console.log("image_path------------>>>>"+resText[i]["biller_logo"]);
	if (resText[i]["biller_logo"] != "") {
		// console.log("biller_logo not null");
		// document.getElementById("biller_id_image").innerHTML="<img
		// height='40%' width='40%' src='"+ resText[i]["biller_logo"] +"'/>"
	} else {
		// document.getElementById("biller_id_image").innerHTML="<img
		// height='40%' width='40%' src='Images/noimage.png'/>"
	}
	console.log("Active status :------>>>> " + resText[i]["active_inactive"]);
	if (resText[i]["active_inactive"] == "Active") {
		document.getElementById('active').checked = true;
		document.getElementById('inactive').checked = false;
	} else if (resText[i]["active_inactive"] == "InActive") {
		document.getElementById('inactive').checked = true;
		document.getElementById('active').checked = false;
	}
*/
}

