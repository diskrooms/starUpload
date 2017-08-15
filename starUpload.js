	//基本原理 利用form的target属性指向一个隐藏的iframe进行提交 从而实现页面无刷新上传文件
	//第零步 初始化结构
	//show_id 要显示图片的容器id
	//input_id 最终存放图片路径的 hidden input
	//服务端接收文件地址
	var _show_id = '';
	var _input_id = '';
	function _pt_init(show_id,input_id,server_upload_url){
		_show_id = show_id;
		_input_id = input_id;
		//动态添加iframe和表单
		var iframe = document.getElementById("_pt_upload_iframe");
		if(iframe == null || iframe == undefined){
			iframe = document.createElement("iframe");
			iframe.setAttribute("id","_pt_upload_iframe");
			iframe.setAttribute("name","_pt_upload_iframe");
			//iframe.src = 'test.html';
			iframe.style.display = "none";
			document.body.appendChild(iframe);
		}
		var form = document.getElementById("_pt_upload_form");
		if(form == null || form == undefined){
			form = document.createElement("form");  
			form.name = "_pt_upload_form";
			form.enctype = "multipart/form-data";
			form.action = server_upload_url;
			form.method = "post";
			form.target = "_pt_upload_iframe";
			form.style.display = "none";
			document.body.appendChild(form);
		}
		var input = document.getElementById("_pt_file_input");
		if(input == null || input == undefined){
			var input = document.createElement("input");  
			input.id = "_pt_file_input";
			input.name = "_pt_file_input";
			input.accept = "image/*";
			input.type = "file";
			input.addEventListener('change',function(){
				_pt_upload_submit(this);
			});
			form.appendChild(input); 
		}
	}
	
	//第一步 用户点击上传按钮触发 file input点击事件
	function _pt_upload_click(){
		var _pt_file_input_dom = document.getElementById('_pt_file_input');
		_pt_file_input_dom.click();
	}
	
	//第二步 file input接收到文件内容后触发表单提交事件
	function _pt_upload_submit(dom){
		if (dom.files.length > 0) {
			document._pt_upload_form.submit();
			//todo 这里可以做一些上传动画以提升用户体验
		}
	}
	
	//第三步 上传之后执行的回调方法
	//status 上传结果 1 成功  0 失败
	//msg 反馈信息
	//reason 成功返回文件路径 失败返回失败原因
	function _pt_callback(status,msg,reason){
		if(status == 1){
			alert(msg);								//todo 提示信息可以根据需要美化
			var show_file = document.getElementById(_show_id);
			var file_target = document.getElementById(_input_id);
			if(show_file == null || show_file == undefined || file_target == null || file_target == undefined){
				alert('没有找到显示图片或存放图片路径的DOM结构');
				return false;
			}
			show_file.src = reason;
			file_target.val = reason;
		} else {
			alert(msg+','+'失败原因或代码:'+reason);	//todo 提示信息可以根据需要美化
		}
}