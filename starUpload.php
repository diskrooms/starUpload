<?php
$config = array(
	'file'=>array("image/gif","image/jpeg","image/pjpeg"),
	'size'=>1000000	//byte
);

if (in_array($_FILES["_pt_file_input"]["type"],$config['file'])){
    if($_FILES["_pt_file_input"]["size"] < $config['size']){
		if ($_FILES["_pt_file_input"]["error"] > 0) {
			//echo "Return Code: ".$_FILES["_pt_file_input"]["error"]."<br />";
			echo '<script>parent._pt_callback(0,"上传失败","'.$_FILES["_pt_file_input"]["error"].'")</script>';
		} else {
			//echo "Upload: ".$_FILES["_pt_file_input"]["name"]."<br />";
			//echo "Type: ".$_FILES["_pt_file_input"]["type"]."<br />";
			//echo "Size: ". ($_FILES["_pt_file_input"]["size"] / 1024)." Kb<br />";
			//echo "Temp file: ".$_FILES["_pt_file_input"]["tmp_name"]."<br />";
			if (file_exists("upload/".$_FILES["_pt_file_input"]["name"])) {
				//echo $_FILES["file"]["name"]." already exists. ";
				echo '<script>parent._pt_callback(0,"上传失败","文件已存在")</script>';
			} else {
				move_uploaded_file($_FILES["_pt_file_input"]["tmp_name"], "upload/".$_FILES["_pt_file_input"]["name"]);
				//echo "Stored in: "."upload/".$_FILES["_pt_file_input"]["name"];
				//回调上传成功js函数
				echo '<script>parent._pt_callback(1,"上传成功","' . 'upload/'.$_FILES["_pt_file_input"]["name"] . '")</script>';
			}
		}
	} else {
		echo '<script>parent._pt_callback(0,"上传失败","文件大小超出")</script>';
	}
} else {
    //echo "Invalid file";
	echo '<script>parent._pt_callback(0,"上传失败","文件类型不符")</script>';
}