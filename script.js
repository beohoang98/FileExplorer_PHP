function $(s) {
	return document.querySelector(s);
}
function $$(s) {
	return document.querySelectorAll(s);
}

async function getDirInfo(path)
{
	const res = await fetch('/api/listDir.php?path='+path).catch(err=>{
		console.log(err);
		return null;
	});

	const json = await res.json().catch(err=>{
		console.log(err);
		return null;
	});

	return json;
}


document.addEventListener('DOMContentLoaded', async()=>{
	const startPath = new URL(window.location.toString()).searchParams.get('path');
	await displayDir(startPath);
	
	const scale = document.cookie.match(/scale\=(\d+(.\d+)?)/i);
	if (scale) setScale(scale[1]);
	console.log(scale);

	$('#scale').addEventListener('input', function(e){	
		const val = e.target.value;
		document.cookie = 'scale='+val;
		setScale(val);
	});
});

function setScale(value)
{
	$('#scale').value = value;
	$('html').style.setProperty('--folder-width', 100*value + 'px');
}

function createFolder(name, path)
{
	const div = document.createElement('a');
	div.className = "folder";
	div.textContent = name;
	div.setAttribute('path', path);
	div.setAttribute('href', "/?path="+path);
	return div;
}

function createFile(file)
{
	const name = file.name;
	const isImg = file.type == "image";
	const isVideo = file.type == "video";

	const fileExt = name.split('.').pop();

	const div = document.createElement('div');
	div.className = "file "+fileExt;

	const divTitle = document.createElement('div');
	divTitle.className = "file-title";
	divTitle.textContent = name;

	if (isImg) {
		const img = document.createElement('img');
		img.src = file.src;
		div.classList.add('file-img');
		div.appendChild(img);
	}
	div.appendChild(divTitle);

	return div;
}

async function displayDir(path)
{
	console.log(path);
	path = !!path ? path : "E:";
	const dir = await getDirInfo(path);

	updatePath(path);
	$('#content').innerHTML = "";

	for (const file of dir)
	{
		let newThing;
		if (file.isFolder)
			newThing = createFolder(file.name, file.path);
		else
			newThing = createFile(file);
	
		$('#content').appendChild(newThing);
	}
}

function updatePath(path)
{
	const pathSplit = path.split('/');
	$('#path').innerHTML='';

	let path_str = ""
	for (const folder of pathSplit)
	{
		if (!folder) continue;

		path_str+=folder + "/";
		const div = document.createElement('a');
		div.className = 'path-name';

		div.setAttribute('href', '/?path='+path_str);
		div.textContent = folder;
		
		$('#path').appendChild(div);
	}
}