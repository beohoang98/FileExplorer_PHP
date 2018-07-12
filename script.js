function previewAudio(src)
{
	const player = $('#audio-player')[0];
	player.src = src;
	player.play();
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
	
	const scale = Cookies.get("scale");
	if (scale) setScale(scale);
	console.log(scale);

	$('#scale').on('input', function(e){	
		const val = e.target.value;
		Cookies.set('scale', val);
		setScale(val);
	});

	$('a').on('click', (e)=>{
		e.preventDefault();
		displayDir(e.target.getAttribute('data-click'));
	})
});

function setScale(value)
{
	$('#scale').val(value);
	$('html').css('--folder-width', 100*value + 'px');
}

function createFolder(name, path)
{
	const div = document.createElement('a');
	div.className = "folder";
	div.textContent = name;
	div.setAttribute('path', path);
	div.setAttribute('href', "/?path="+path);

	div.addEventListener('click',(e)=>{
		e.preventDefault();
		displayDir(path);
	});

	return div;
}

function createFile(file)
{
	const name = file.name;

	const fileExt = name.split('.').pop();

	const div = document.createElement('div');
	div.className = "file "+fileExt;
	div.title = file.name;

	const divTitle = document.createElement('div');
	divTitle.className = "file-title";
	divTitle.textContent = name;

	if (file.type== "image") {
		const img = document.createElement('img');
		img.src = file.src;
		div.classList.add('file-img');
		div.appendChild(img);
	}
	else if (file.type == "audio")
	{
		// const audio = document.createElement('audio');
		// audio.src = file.src;

		div.classList.add('file-audio');
		// div.appendChild(audio);
		div.addEventListener('click', (e)=>{
			previewAudio(file.src);
		});
	}
	else if (file.type == "video")
	{
		div.classList.add('file-video');

		div.addEventListener('click', (e)=>{
			previewAudio(file.src);
		});
	}

	div.appendChild(divTitle);

	return div;
}

async function displayDir(path)
{
	console.log(path);
	path = !!path ? path : "E:";
	const dir = await getDirInfo(path);

	window.history.pushState("change url", document.title, "/?path="+path);

	updatePath(path);
	$('#content').children().remove();

	for (const file of dir)
	{
		let newThing;
		if (file.isFolder)
			newThing = createFolder(file.name, file.path);
		else
			newThing = createFile(file);
	
		$('#content').append(newThing);
	}
}

function updatePath(path)
{
	const pathSplit = path.split('/');
	$('#path').text('');

	let path_str = "";
	for (const folder of pathSplit)
	{
		if (!folder) continue;

		path_str+= folder + "/";
		let itsPath = path_str;

		const div = document.createElement('a');
		div.className = 'path-name';

		div.setAttribute('href', '/?path='+path_str);
		div.textContent = folder;
		div.setAttribute('title', path_str);
		
		div.addEventListener('click', (e)=>{
			e.preventDefault();
			displayDir(itsPath);
		});
		
		$('#path').append(div);
	}
}