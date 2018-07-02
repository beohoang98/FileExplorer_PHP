<?php
	header('Content-Type', 'application/json');
	header('Access-Controll-Allow-Origin', 'explorer/');

	$path = isset($_GET['path']) ? $_GET['path'] : "e:/";

	$files = scandir($path);

	foreach ($files as $file)
	{
		echo $file."\n";
	}
?>