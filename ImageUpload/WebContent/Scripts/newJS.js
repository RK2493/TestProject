/**
 * 
 */
var ImageBase64String="";
var ImageBase64String1="";
var params1="";
var params2="";
var eph_csv="";


var RowId;
var handleFileSelect = function(evt) 
    {
	    var files = evt.target.files;
	    var file = files[0];
	    var base64String="";
	   
	    var billeridhidden="",billeridhiddenregisterid="";
	    billeridhidden=document.getElementById("billeridhidden").value;
	    billeridhiddenregisterid=document.getElementById("billeridhiddenregisterid").value;
	    console.log("billeridhidden--------->>>"+billeridhidden+"<<<billeridhiddenregisterid ==="+billeridhiddenregisterid);
	    
	    if (files && file) 
	    {
	        var reader = new FileReader();

	        reader.onload = function(readerEvt) 
	        {
	            var binaryString = readerEvt.target.result;
	            //document.getElementById("base64textarea").value = btoa(binaryString);
	            base64String=btoa(binaryString);
	            ImageBase64String=base64String;
	            params1="imageString="+btoa(binaryString)+"&billeridhidden="+billeridhidden+"&billeridhiddenregisterid="+billeridhiddenregisterid;
	             //console.log("params------->"+params);
	        };
	        reader.readAsBinaryString(file);
	        
	    }
	    
	    
	};
	var handleFileSelect3=function(evt){
		 var selected="";
       	 selected = document.getElementById('update_category').value;
       	 console.log("update_category selected---->>>"+selected);
        if(selected==0 && window.callResText[idd]["category"]==="Mobile Recharge"){
        	if(document.getElementById('update_euronet').checked && document.getElementById('update_oxigen').checked){
        		document.getElementById('update_biller_id').value=window.callResText[idd]["biller_id"];
        		document.getElementById("update_allies_name").value=window.callResText[idd]["allies_name"];
        		document.getElementById("update_spec_id").value=window.callResText[idd]["spec_id"];
        	}else if(document.getElementById('update_euronet').checked ){
        		document.getElementById("update_spec_id").value=window.callResText[idd]["spec_id"];
        	}else if(document.getElementById('update_oxigen').checked ){
        		document.getElementById('update_biller_id').value=window.callResText[idd]["biller_id"];
        		document.getElementById("update_allies_name").value=window.callResText[idd]["allies_name"];
        	}else if(!document.getElementById('update_oxigen').checked && !document.getElementById('update_euronet').checked ){
        		document.getElementById('update_biller_id').value="";
        		document.getElementById("update_allies_name").value="";
        		document.getElementById("update_spec_id").value="";
        	}
        	//document.getElementById("update_allies_name").value=window.callResText[idd]["allies_name"];
        }else if(selected==1 && window.callResText[idd]["category"]==="DTH"){
        	//document.getElementById("update_ssp_code").value=window.callResText[idd]["allies_name"];
        	if(document.getElementById('update_euronet').checked && document.getElementById('update_oxigen').checked){
        		document.getElementById("update_spec_id").value=window.callResText[idd]["spec_id"];
        		document.getElementById("update_ssp_code").value=window.callResText[idd]["allies_name"];
        		document.getElementById('update_biller_id').value=window.callResText[idd]["biller_id"];
        	}else if(document.getElementById('update_euronet').checked ){
        		document.getElementById("update_spec_id").value=window.callResText[idd]["spec_id"];
        		document.getElementById("update_ssp_code").value=window.callResText[idd]["allies_name"];
        	}else if(document.getElementById('update_oxigen').checked ){
        		document.getElementById('update_biller_id').value=window.callResText[idd]["biller_id"];
        		document.getElementById("update_allies_name").value="";
        	}else if(!document.getElementById('update_oxigen').checked && !document.getElementById('update_euronet').checked ){
        		document.getElementById("update_spec_id").value="";
        		document.getElementById("update_ssp_code").value="";
        		document.getElementById('update_biller_id').value="";
        	}
        }
	}
	var handleFileSelect2 = function(evt) 
    {
	    var files = evt.target.files;
	    var file = files[0];
	    var base64String="";
	    params2="";
	    if (files && file) 
	    {
	        var reader = new FileReader();

	        reader.onload = function(readerEvt) 
	        {
	            var binaryString2 = readerEvt.target.result;
	            base64String=btoa(binaryString2);
	            ImageBase64String2=base64String;
	            params2="biller_logo="+btoa(binaryString2);
	            param3=params2;
	          // console.log("<<<------- new js params------->"+params2);
	        };
	        reader.readAsBinaryString(file);
	        
	    }else{
	    	param3="";
	    	params2="";
	    }
	    
	    
	};
	
	
	var handleFileSelectEPHMaster = function(evt) 
    {
		
	    var files = evt.target.files;
	    var file = files[0];
	    var base64String="";
	    params2="";
	    if (files && file) 
	    {
	        var reader = new FileReader();

	        reader.onload = function(readerEvt) 
	        {
	            var binaryString2 = readerEvt.target.result;
	            eph_csv=btoa(binaryString2);
	          // console.log("<<<------- new js params------->"+eph_csv);
	        };
	        reader.readAsBinaryString(file);
	        
	    }
	    
	    
	};
	
	

	function addBillerClearValues(){
		console.log("inside addBillerClearValues");
		document.getElementById("filePicker1").value="";
		document.getElementById("biller_name").value=""; 
		document.getElementById("biller_id").value="";
		document.getElementById("allies_name").value="";
		document.getElementById("spec_id").value="";
		document.getElementById("ssp_code").value="";
		  
		document.getElementById("euronet").checked=false;
		document.getElementById("oxigen").checked=false;
		
		document.getElementById('add_active').checked=false;
		document.getElementById('add_inactive').checked=false;
		document.getElementById('oxigen_div').style.display = 'none'; 
		document.getElementById('euronet_div').style.display = 'none'; 
	}
	function ClearValues(){
		console.log("inside ClearValues");
		params2="";
	}
	function submit_data(id,cate){
		console.log("id---->>"+id+" category ====>>" +cate);
		if(id==0 && cate=="update_billpay")
		{
		
			var biller_name= (document.getElementById('biller_name_update').value).trim();
			console.log("biller_name---->> "+biller_name);
			if(biller_name==null || biller_name==""){
				alert("Please enter Biller name.");
			}
			else
			{
				ajaxindicatorstart();
		        
				//console.log("params22222222333333------->"+params1);
				console.log("inside submit_data");
				xmlhttp = new XMLHttpRequest();
				if(params1!="" && params1!=null)
				{
					console.log("in if ");
					if (document.getElementById('active').checked) {
						var active_inactive4=document.getElementById('active').value;
						console.log("in if active_inactive4---------->> "+active_inactive4);
						params1=params1+"&active_inactive="+active_inactive4;
						console.log("in if params1 -------------->>>>>>"+params1);
					}
					else if (document.getElementById('inactive').checked) {
						var active_inactive=document.getElementById('inactive').value;
						console.log("in if active_inactive---------->> "+active_inactive);
						params1=params1+"&active_inactive="+active_inactive;
						console.log("in if params2 -------------->>>>>>"+params1);
					}
					if(document.getElementById('activebbps').checked){
						params1=params1+"&bbps="+document.getElementById('activebbps').value;
					}else if(document.getElementById('inactivebbps').checked){
						params1=params1+"&bbps="+document.getElementById('inactivebbps').value;
					}
				}else{
					console.log("in elelelelel ");
					var billeridhidden1=document.getElementById("billeridhidden").value;
					var billeridhiddenregisterid1 = document.getElementById("billeridhiddenregisterid").value;
					console.log("in else billeridhidden1------------->>>>>"+billeridhidden1);
					console.log("in else billeridhiddenregisterid1------------->>>>>"+billeridhiddenregisterid1);
					if (document.getElementById('active').checked) {
						var active_inactive2=document.getElementById("active").value;
						params1="imageString="+""+"&billeridhidden="+billeridhidden1+"&active_inactive="+active_inactive2+"&billeridhiddenregisterid="+billeridhiddenregisterid1;
						console.log("in if params3 -------------->>>>>>"+params1);
						}
					if (document.getElementById('inactive').checked) {
						var active_inactive2=document.getElementById("inactive").value;
						params1="imageString="+""+"&billeridhidden="+billeridhidden1+"&active_inactive="+active_inactive2+"&billeridhiddenregisterid="+billeridhiddenregisterid1;
						console.log("in if params4 -------------->>>>>>"+params1);
					}
					if(document.getElementById('activebbps').checked){
						params1=params1+"&bbps=Y";
					}
					if(document.getElementById('inactivebbps').checked){
						params1=params1+"&bbps=N";
					}
					
				}
				params1=params1+"&biller_name="+biller_name;	
				console.log("params<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>------->"+params1);
			    xmlhttp.open("POST", "UploadImage1", true);
			    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");	    
			    xmlhttp.onreadystatechange = function() 
			      {
			            if (xmlhttp.readyState === 4 && xmlhttp.status === 200) 
			            {
			                 ajaxindicatorstop();
			           	 console.log("Response1111 : "+xmlhttp.responseText);
			           	 if(xmlhttp.responseText!=null && xmlhttp.responseText!=""){
			           		resText=JSON.parse(xmlhttp.responseText);
				           	if(resText[0]["status"]==="true")
			            	 {
			            	 	 alert("Uploaded Data successfully.");
			            	 	params1="";
			            	 		$('#ViewModal').modal('hide');
			            	 	 callBillersBillPay(1,document.getElementById('show_categoryBillPay').options[document.getElementById('show_categoryBillPay').selectedIndex].value);
			            	 
			            	 }
				           	 else if(resText[0]["status"]==="false")
			            	 {
			            	 	 alert("Oops!...something went wrong.");
			            	 	params1="";
			            	 	 callBillersBillPay(1,document.getElementById('show_categoryBillPay').options[document.getElementById('show_categoryBillPay').selectedIndex].value);
			            	 } 
			           	 }else{
			           		 alert("Oops!!..Something went wrong.");
			           	 }
			           	
			           	}
			       }
			     xmlhttp.send(params1);
			}
		}else{
			console.log("in delete code");
		}
	}
	
	
	function fun(){
		
		
		RowId = document.getElementById('RowId');
		
		ImageBase64String="";
		ImageBase64String1="";
		params1="";
		params2="";
		console.log("<<--------------- inside  fun--------------->>");
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			var el = document.getElementById('filePicker');
			var el2 = document.getElementById('filePicker1');
			var el3 = document.getElementById('filePicker2');
			var sel=document.getElementById('update_category');
			var update_refund_status=document.getElementById('update_refund_status');
			
			var emp_csv=document.getElementById('fname');
			console.log("sel----->>>"+sel); 
			//console.log("billerlogo----->>>"+document.getElementById('billerlogo'));
			
		
			//console.log("elll222----->>>"+el2);
			//console.log("elll333----->>>"+el3);
			if(el || el2 || el3 ||sel || emp_csv || update_refund_status){
				 el.addEventListener('change', handleFileSelect, false);
				 el2.addEventListener('change', handleFileSelect2, false);
				 el3.addEventListener('change', handleFileSelect2, false);
				 sel.addEventListener('change', handleFileSelect3,false );
				 emp_csv.addEventListener('change', handleFileSelectEPHMaster,false );
				 //update_refund_status.addEventListener('change', handleFileUpdateRefundStatus, false)
			 }else{
				console.log("elll----->>>"+el+" e222---->>>"+el2+" ----emp_csv ....>>>"+emp_csv +" update_refund_status " +update_refund_status);
			}
		}	
		else 
		{
		    alert('The File APIs are not fully supported in this browser.');
		}
	}
	function fun1(){
		ImageBase64String="";
		ImageBase64String1="";
		params1="";
		params2="";
		//console.log("<<--------------- inside  fun11--------------->>");
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			
			var el4 = document.getElementById('filePicker3');
			//console.log("el4----->>>"+el4);
			//console.log("elll222----->>>"+el2);
			//console.log("elll333----->>>"+el3);
			if(el4){
				 
				 el4.addEventListener('change', handleFileSelect2, false);
			 }else{
				console.log("elll----->>>"+el+" e222---->>>"+el2);
			}
		}	
		else 
		{
		    alert('The File APIs are not fully supported in this browser.');
		}
	}




