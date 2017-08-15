# starUpload
三步即可实现页面无刷新提交图像功能
#Step One
页面任意位置引入starUpload.js
<script type="text/javascript" src="starUpload.js"></script>

#Step Two
等待页面加载完毕或者在页面底部执行初始化函数进行初始化，初始化函数共三个参数
第一个参数 最终要显示图像的img标签id
第二个参数 最终要存放图像路径的hidden input的id
第三个参数 服务端接收图像数据的文件地址
<script type="text/javascript">
	_pt_init('show_file_','file_target_','starUpload.php');
</script>

#Step Three
给上传按钮添加点击事件，触发上传函数 _pt_upload_click
<div onClick="javascript:_pt_upload_click()">上传图片</div>


