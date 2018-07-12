<?php
	header('Content-Type', 'application/json');
	header('Access-Controll-Allow-Origin', 'explorer/');
	require "_myFunc.php";

	$path = (isset($_GET['path']) && !!$_GET['path'])
			? $_GET['path']."/" : "e:/";
	
	$prevPath = preg_split("/\//", $path); 
	array_pop($prevPath);
	array_pop($prevPath);
	$prevPath = $prevPath ? implode("/", $prevPath) : "";

	$files = scandir($path);

	$data = [];
	foreach ($files as $file)
	{
		if ($file == ".") continue;
		$thing = [
			"name"=>$file,
			"isFolder"=>false,
			"path"=>$path.$file,
			"type"=>false,
			"src"=>"/api/getDataFile.php?path=".$path.$file
		];
		if (is_dir($path.$file)) {
			$thing['isFolder'] = true;
			if ($file == "..") {
				$thing['path'] = $prevPath;
			}
		}
		else {
			$thing['type'] = checkFileTypeByName($file);
		}
		array_push($data, $thing);
	}

	usort($data, function($a, $b) {
		if ($a['isFolder'] == $b['isFolder'])
		{
			return $a['name'] <=> $b['name'];
		}

		return $a['isFolder'] < $b['isFolder'];
	});

	echo json_encode($data);
?>