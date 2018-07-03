<?php
	header('Content-Type', 'application/json');
	header('Access-Controll-Allow-Origin', 'explorer/');

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
			"type"=>null,
			"src"=>false
		];
		if (is_dir($path.$file)) {
			$thing['isFolder'] = true;
			if ($file == "..") {
				$thing['path'] = $prevPath;
			}
		}
		else {
			$ext =strtolower(pathinfo($path.$file, PATHINFO_EXTENSION));
			if ($ext == "gif" || $ext == "png" || $ext == "jpg"
				|| $ext == "bmp")
			{
				$thing['type'] = 'image';
				$thing["src"] = "/api/getDataFile.php?path=".$path.$file;
			}
			else if ($ext == "mp4" || $ext == "flv")
			{
				$thing['type'] = 'video';
				$thing["src"] = "/api/getDataFile.php?path=".$path.$file;
			}
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