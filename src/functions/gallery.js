const layouts = [
	{
		name: 'Grid',
		href: '/Grid-project',
		description: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque reprehenderit architecto, laborum quam tempore expedita temporibus. Distinctio laboriosam, at pariatur excepturi maxime totam cum, cumque mollitia quidem officiis, consectetur possimus.',
		urls: {
			img1: './img/Gallery/GridProject/img1.jpg',
			img2: './img/Gallery/GridProject/img2.jpg',
			img3: './img/Gallery/GridProject/img3.jpg',
		}
	},
	{
		name: 'Connection',
		href: '/Connection',
		description: '2 Obcaecati quis quo alias placeat incidunt aspernatur possimus ducimus officiis, numquam quam? Quam, totam repellat ad autem delectus minus veniam iste laudantium nisi exercitationem harum, tempore voluptas reprehenderit debitis quidem earum itaque natus facere!',
		urls: {
			img1: './img/Gallery/GridProject/img3.jpg',
			img2: './img/Gallery/GridProject/img1.jpg',
			img3: './img/Gallery/GridProject/img2.jpg',
		}
	},
	{
		name: 'Oil',
		href: '/Home',
		description: '3 Nemo eaque placeat pariatur repellat veritatis quia aliquid totam assumenda reprehenderit accusamus! Iste ut, sint quidem deleniti ipsa temporibus blanditiis nisi accusantium unde eligendi ullam soluta sunt mollitia voluptatibus voluptatum aliquam quos obcaecati.',
		urls: {
			img1: './img/Gallery/GridProject/img4.jpg',
			img2: './img/Gallery/GridProject/img2.jpg',
			img3: './img/Gallery/GridProject/img1.jpg',
		}
	}
];


function scrollProjectsItems (e) {
		if (this.state.timerStop) return;
		console.log(this);

		this.setState(() => {
			return {timerStop: true};
		})

		let timer = setTimeout(() => {
			this.setState(() => {
				return {timerStop: false};
				})
			}, 600);
		
		let projects = [...document.getElementsByClassName('Gallery__projects--item')];

		if (e.deltaY < 0) {
			if(this.state.index == 0) return;

			scrollToTop(projects, this.state.index);
			moveImgUp.bind(this)();
			showDescription.bind(this)('prev');
			turnWheel.bind(this)('down');

			this.setState((prevState) => {
				return {
					index: prevState.index - 1,
					wheelRotation: prevState.wheelRotation - 30 
				};
			})
		}

		if (e.deltaY > 0) {
			if(this.state.index == projects.length - 1) return;
			scrollToBottom(projects, this.state.index);
			moveImgDown.bind(this)();
			showDescription.bind(this)('next');
			turnWheel.bind(this)('up');
			
			this.setState((prevState) => {
				return {
					index: prevState.index + 1,
					wheelRotation: prevState.wheelRotation + 30 
				};
			})
		}
	}

	function turnWheel (deg) {
		switch(deg) {
			case 'up': {
				
				let wheel = document.getElementById('Capa_1');
				wheel.style.transform = `rotate(${this.state.wheelRotation + 30}deg)`;
				break;
			}
			case 'down': {
				
				let wheel = document.getElementById('Capa_1');
				wheel.style.transform = `rotate(${this.state.wheelRotation - 30}deg)`;
				break;
			}
			default: break;
		}
	}

	function showDescription (which) {
		console.log(this);
		let text = [...document.querySelectorAll('.Gallery__projects--description div')];
		document.querySelector('.Gallery__projects--description div.showDescription').classList.remove('showDescription');
		
		switch(which) {
			case 'next': {
				text[this.state.index + 1].classList.add('showDescription');
				break;
			}
			case 'prev': {
				text[this.state.index - 1].classList.add('showDescription');
				break;
			}
			default: break;
		}
		
	}

	function moveImgDown(e) {
		console.log('up');
		let images = [...document.querySelectorAll('.Gallery__posters img')];
		let imagesTop = [...document.querySelectorAll('.Gallery__posters .hide-top')];

		images.forEach((img) => {
			if(!img.classList.contains('hide-top') && !img.classList.contains('hide-bottom')) {
				img.classList.add('hide-bottom');
			}
		})

		if(imagesTop) {
			for (let i=0; i<imagesTop.length; i++) {
				if (i>imagesTop.length - 4) {
					imagesTop[i].classList.remove('hide-top');
				}
			}
		}
	}

	function moveImgUp (e) {
		let images = [...document.querySelectorAll('.Gallery__posters img')];
		let imagesBottom = [...document.querySelectorAll('.Gallery__posters .hide-bottom')]
		images.forEach((img) => {
			if(!img.classList.contains('hide-top') && !img.classList.contains('hide-bottom')) {
				img.classList.add('hide-top');
			} 
		})
		if(imagesBottom) {
			for(let i=0; i<imagesBottom.length; i++) {
				if(i<3) {
					imagesBottom[i].classList.remove('hide-bottom');
				}
			}
		}
	}


function scrollToTop(projects, index) {
	if (projects[index - 2]) {
		projects[index - 2].classList.add('top');
	}

	projects[index - 1].classList.remove('top');
	projects[index - 1].classList.add('center');

	projects[index].classList.remove('center');
	projects[index].classList.add('bottom');

	if(projects[index + 1]) {
		projects[index + 1].classList.remove('bottom');
		projects[index + 1].classList.add('under');
	}
};

function scrollToBottom(projects, index) {
	if (projects[index - 1]){
		projects[index - 1].classList.remove('top');
	}

	projects[index].classList.remove('center');
	projects[index].classList.add('top');

	projects[index + 1].classList.remove('bottom');
	projects[index + 1].classList.add('center');
	
	if (projects[index + 2]){
		projects[index + 2].classList.remove('under');
		projects[index + 2].classList.add('bottom');			
	}
}


export {layouts, scrollProjectsItems};