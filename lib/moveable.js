(function(){
	document.addEventListener('DOMContentLoaded', ()=>{

		const divList = document.querySelectorAll(".movable");

		if (divList.length == 0) return;

		function movable(element) {
			let startX, startY, canMove = false;
			const moveBar = element.querySelector('.movable-title');

			moveBar.addEventListener('mousedown', (e)=>{
				startX = e.clientX - element.offsetLeft;
				startY = e.clientY - element.offsetTop;
				canMove = true;
			});

			document.addEventListener('mousemove', (e)=>{
				// console.log(e);
				if (!canMove) return;
				// console.log(startX, startY);
				e.preventDefault();
				
				element.style.right = "unset";
				element.style.bottom = "unset";
				element.style.top = e.clientY - startY + "px";
				element.style.left = e.clientX - startX + "px";
			});

			moveBar.addEventListener('mouseup', ()=>{
				canMove = false;
			});
		}

		divList.forEach(val=>{
			movable(val);
		});

		console.log(divList);

	});
})();