<?php
	require "_myFunc.php";

	header('Access-Controll-Allow-Origin: explorer/*');

	$path = trim($_GET['path']);
	$type = checkFileTypeByName($path);
	header("Content-Type: $type");

	// echo $path;
	echo file_get_contents($path);
	// if ($type == "video") {
	// 	sendVideo($path);
	// }
	// else {
		
	// }
?>