<?php
	header('Access-Controll-Allow-Origin', 'explorer/');

	$path = trim($_GET['path']);
	// echo $path;
	echo file_get_contents($path);
?>