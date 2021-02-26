/**
 * 
 */
$(document).ready(function() {
	console.log("Here");
	var id = $('#pageno').val();
	deptLoadPage(id);	
});

function deptLoadPage(id) {
	//setting id as default paramater
	id = id || 1;
	console.log("Entry");
	console.log("In load Page");
	$.getJSON("/Mobitrail_HRMS/DepartmentData?id="+id, 
			
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
        	deptLoadPage(page);
            console.info(page + ' (from options)');
        }
    })
	
	var cal = (id-1)*no_of_records;
	console.log("ID is "+id);
	console.log("calculated valus is "+cal);

	for (var i = 0; i < data.length - 1; i++) {
		var row = $("<tr>"); 
		row.append($("<td style='text-align:left;'>").text(cal + (i + 1)));
		row.append($("<td style='text-align:left;'>").text(data[i].dept_id));
		row.append($("<td style='text-align:left;'>").text(data[i].name));
		row.append($("<td style='text-align:left;'>").text(data[i].status));
		row.append($("<td style='text-align:left;'>").text(data[i].branch_id));
		row.append($("<td style='text-align:left;'>").text(data[i].uploaded_on));
		/*row.append($("<td><div style='text-align:center;'><a data-toggle='modal' href='#ViewModal' id='"
				+ data[i].insta_pay_biller_id+ "' onclick='viewEmployeeDetails(this.id,"+ i+ ")' style='cursor: pointer;'>View</a> </div>"));
				*/
		row.append($("<td> <img class='img-responsive' id='"+ data[i].biller_id+ "' src='Images/edit.png' class='mousechange' onclick='edit1(this.id,"+ i
				+ ")' style='cursor: pointer;' data-toggle='modal' data-target='#updateModal'/>"));
		row.append($("<td><div style='text-align:center;'><img id='"
				 +data[i].id+ "' src='Images/delete.png' class='mousechange' onclick='alert2(this.id)' style='cursor: pointer;'/> </div>"));

		tBody.append(row);
	}
};
