class MyMediaPlayer {

	constructor(element = null, type="audio") {
		if (element == null) {
			this.element = document.createElement('div');
		}
		else {
			this.element = element;
			this.element.html="";
		}

		if (type in ["audio", "video"])
			this.type = type;
		else
			throw new Error("unknown type: "+ type);

		this.init();
	}

	init() {

	}

	togglePlay() {

	}

	stop() {

	}

	next() {

	}

	prev() {

	}

	setVolume(val) {

	}

	setPos(pos) {

	}

	_createButton(type) {
		if (!type) throw new Error("wtf");

		if (!(type in ["play-pause","next", "prev", "stop"]))
		{
			throw new Error("wtf 2");
		}

		const button = document.createElement('button');
		button.classList.add([
			'myMediaPlayer-button',
			'myMediaPlayer-'+type
		]);

		button.addEventListener('click', ()=>{
			if (type == 'play-pause')
				this.togglePlay();
			else if (type == "next")
				this.next();
			else if (type == "prev")
				this.prev();
			else if (type == "stop")
				this.stop();
			else {
				console.log("Something wtf went wrong");
			}
		});

		button.textContent = type;

		return button;
	}

	_createVolumnInput()
	{
		const rangeInput = document.createElement('input');
		rangeInput.setAttribute('type', "range");
		rangeInput.classList.add("myMediaPlayer-volume");
		rangeInput.setAttribute('min', 0);
		rangeInput.setAttribute('max', 1);
		rangeInput.setAttribute('steps', 0.1);
		rangeInput.value = 0.5;

		rangeInput.addEventListener('input', ()=>{
			const val = rangeInput.value;
			this.setVolume(val);
		});

		return rangeInput;
	}

	_createPeekInput()
	{
		const rangeInput = document.createElement('input');
		rangeInput.setAttribute('type', "range");
		rangeInput.classList.add("myMediaPlayer-peek");
		rangeInput.setAttribute('min', 0);
		rangeInput.setAttribute('max', 1);
		rangeInput.setAttribute('steps', 0.01);
		rangeInput.value = 0;

		rangeInput.addEventListener('input', ()=>{
			const val = rangeInput.value;
			this.setVolume(val);
		});

		return rangeInput;
	}
}