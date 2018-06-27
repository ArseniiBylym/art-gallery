export default function scrollAnimations() {

//Consts
const screenH = document.documentElement.clientHeight;
// const screenW = document.documentElement.clientWidth;
const elems = {
	header: document.getElementById('Home__Header'),
	gallery: document.getElementById('Home__Gallery'),
	events: document.getElementById('Home__EventsPre'),
	about: document.getElementById('Home__AboutPre'),
	footer: document.getElementById('Home__FooterPre'),
	events__list: document.querySelectorAll('.EventsPre .Event')
}

const elemsTopCoords = {
	header: elems.header.getBoundingClientRect().top + window.scrollY,
	gallery: elems.gallery.getBoundingClientRect().top + window.scrollY,
	events: elems.events.getBoundingClientRect().top + window.scrollY,
	about: elems.about.getBoundingClientRect().top + window.scrollY,
	footer: elems.footer.getBoundingClientRect().top + window.scrollY,
	events__event0: elems.events__list[0].getBoundingClientRect().top + window.scrollY,
	events__event1: elems.events__list[1].getBoundingClientRect().top + window.scrollY,
	events__event2: elems.events__list[2].getBoundingClientRect().top + window.scrollY,
};
	
const animElems = {
	gallery__title: document.querySelector('.Home__Gallery__title'),
	events__title: document.querySelector('.EventsPre__title'),
	about__title: document.querySelector('.AboutPre__info--header'),
	about__biography: document.querySelector('.AboutPre__info--biography'),
	header__title: document.querySelector('.Header__title'),
	events__title__eventList: document.querySelectorAll('.EventsPre .Event')
}
	
//Functions
	window.addEventListener('scroll', (e) => {
		
		if (window.scrollY + 150 >= elemsTopCoords.about)	{
			showFooter();
		}	else hideFooter();
		

		toggleElem('gallery', 100, animElems.gallery__title);
		toggleElem('events', 100, animElems.events__title);
		toggleElem('about', 200, animElems.about__title);
		toggleElem('about', 400, animElems.about__biography);

		if (window.scrollY < elemsTopCoords.gallery) {
			animElems.header__title.style.marginTop = `${window.scrollY/1.5}px`;
		}
		toggleElem('events__event0', 0, animElems.events__title__eventList[0]);
		toggleElem('events__event1', 0, animElems.events__title__eventList[1]);
		toggleElem('events__event2', 0, animElems.events__title__eventList[2]);

	})


	function showFooter() {
		if (elems.footer.style.display === 'block') return;
		elems.footer.style.display = 'block';
	}

	function hideFooter() {
		if (window.getComputedStyle(elems.footer).getPropertyValue('display') === 'none') return;
		elems.footer.style.display = 'none';
	}


	function toggleElem(screen, dellay, elem) {
		if(window.scrollY + screenH > elemsTopCoords[screen] + dellay) {
			showElem(elem);
		} else hideElem(elem);
	}

	//Add and remove class to element with origin className + preffix '--show'
	function showElem(elem) {
		const className = elem.classList[0];
		elem.classList.add(className + '--show');
	}

	function hideElem(elem) {
		const className = elem.classList[0];
		elem.classList.remove(className + '--show');	
	}
}