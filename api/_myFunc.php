<?php

function checkFileTypeByName($filename)
{
	$imgExts = ["gif", "bmp", "jpg", "jpeg", "png", "ico", "svg"];
	$videoExts = ["mp4", "wmv", "flv", "avi", "mov"];
	$audioExts = ["mp3", "m4a", "wma", "wav", "flac"];
	
	$ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
	
	if (in_array($ext, $imgExts)) {
		return "image";
	}
	else if (in_array($ext, $videoExts)) {
		return "video";
	}
	else if (in_array($ext, $audioExts)) {
		return "audio";
	}

	return "unknown";
}

function sendVideo($path) {
	$chunkSize = 8*1024*1024; //8MB
	$fileSize = filesize($path);
	$currentPos = 0;

	header('HTTP/1.1 206 Partial Content');
	header("Content-Length: $fileSize");
	// header("Content-Range: bytes 0-".($fileSize-1)."/$fileSize");

	$stream = fopen($path, "rb");
	while (!feof($stream)) {
		$data = fread($stream, $chunkSize);
		echo $data;
		flush();
	}

	fclose($stream);
}

?>