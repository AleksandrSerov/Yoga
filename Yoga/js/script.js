window.addEventListener("DOMContentLoaded", () => {
	"use strict";
	//Tabs
	let tab =
		Array.prototype.slice.call(document.querySelectorAll('.info-header-tab')),
		info = document.querySelector(".info-header"),
		tabContent = document.querySelectorAll(".info-tabcontent");

	let hideTabContent = () => {
		for (let item of tabContent) {
			item.classList.remove("show");
			item.classList.add("hide");
		}
	};
	let showTabContent = (number) => {
		if (tabContent[number].classList.contains("hide")) {
			tabContent[number].classList.remove("hide");
			tabContent[number].classList.add("show");
		}
	};
	hideTabContent();
	showTabContent(0);

	info.addEventListener('click', (event) => {
		let target = event.target;
		if (target && target.classList.contains("info-header-tab")) {
			hideTabContent();
			showTabContent(tab.indexOf(target));
		}
	});

	// Timer 
	let setTimer = (deadline, id) => {
		let getTimeRemaining = (deadline) => {
			let t = Date.parse(deadline) - Date.parse(new Date()),
				seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor((t / 1000 / 60) % 60),
				hours = Math.floor((t / (1000 * 60 * 60)));

			if (seconds < 10) {
				seconds = "0" + seconds;
			}
			if (minutes < 10) {
				minutes = "0" + minutes;
			}
			if (hours < 10) {
				hours = "0" + hours;
			}
			return {
				"total": t,
				"hours": hours,
				"minutes": minutes,
				"seconds": seconds
			};
		};
		let setClock = (id, deadline) => {
			let timer = document.getElementById(id),
				hours = timer.querySelector(".hours"),
				minutes = timer.querySelector(".minutes"),
				seconds = timer.querySelector(".seconds");
			let updateClock = () => {
				let t = getTimeRemaining(deadline);
				if (t.total <= 0) {
					clearInterval(timeInterval);
					hours.textContent = "00";
					minutes.textContent = "00";
					seconds.textContent = "00";
				} else {
					hours.textContent = t.hours;
					minutes.textContent = t.minutes;
					seconds.textContent = t.seconds;
				}
			};
			let timeInterval = setInterval(updateClock, 1000);
		};
		setClock(id, deadline);
	};
	setTimer('2018-12-18', 'timer');

	//Modal
	let more = document.querySelector('.more'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');

	let openModal = () => {
		overlay.style.display = 'block';
		document.body.style.overflow = 'hidden';
	};

	let closeModal = () => {
		overlay.style.display = 'none';
		document.body.style.overflow = '';
	};

	more.addEventListener('click', openModal);
	close.addEventListener('click', closeModal);

	let descriptionBtns = document.querySelectorAll('.description-btn');
	for (let i = 0; i < descriptionBtns.length; i++) {
		descriptionBtns[i].addEventListener('click', openModal);
	}

	//Form
	let message = {
		loading: "Загрузка",
		success: "Спасибо! Скоро мы с вами свяжемся!",
		failure: "Что-то пошло не так..."
	};

	let form = document.querySelector('.main-form'),
		inputs = Array.prototype.slice.call(document.querySelectorAll('input')),
		statusMessage = document.createElement('div'),
		contactForm = document.querySelector('#form');
	statusMessage.classList.add('status');

	let sendForm = (elem) => {
		elem.addEventListener('submit', (e) => {
			e.preventDefault();
			elem.appendChild(statusMessage);
			let formData = new FormData(elem);

			let postData = (data) => {
				return new Promise((resolve, reject) => {
					let request = new XMLHttpRequest();
					request.open("POST", "server.php");
					request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

					request.onreadystatechange = () => {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.status == 200 && request.status < 300) {
								resolve();
							} else {
								reject();
							}
						}
					};
					request.send(data);
				});
			};

			let clearInput = () => {
				for (let item of inputs) {
					item.value = "";
				}
			};

			postData(formData)
				.then(() => {
					statusMessage.innerHTML = message.loading;
				})
				.then(() => {
					statusMessage.innerHTML = message.success;
				})
				.catch(() => statusMessage.innerHTML = message.failure)
				.then(clearInput);
		});
	};
	sendForm(form);
	sendForm(contactForm);

	//Slider
	let slideIndex = 1,
		slides = document.querySelectorAll(".slider-item"),
		prev = document.querySelector(".prev"),
		next = document.querySelector(".next"),
		dotsWrap = document.querySelector(".slider-dots"),
		dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));

	let showSlides = (number) => {
		if (number > slides.length) {
			slideIndex = 1;
		}
		if (number < 1) {
			slideIndex = slides.length;
		}
		slides.forEach((item) => item.style.display = "none");
		dots.forEach((item) => item.classList.remove("dot-active"));
		slides[slideIndex - 1].style.display = "block";
		dots[slideIndex - 1].classList.add("dot-active");
	};
	showSlides(slideIndex);
	let plusSlides = (number) => {
		showSlides(slideIndex += number);
	};
	let currentSlide = (number) => {
		showSlides(slideIndex = number);
	};
	prev.addEventListener("click", () => {
		plusSlides(-1);
	});
	next.addEventListener("click", () => {
		plusSlides(1);
	});
	dotsWrap.addEventListener("click", (event) => {
		if (event.target.classList.contains('dot')) {
			currentSlide(dots.indexOf(event.target) + 1);
		}
	});

 //calc
	let persons = document.querySelectorAll(".counter-block-input")[0],
		restDays = document.querySelectorAll(".counter-block-input")[1],
		place = document.getElementById("select"),
		totalValue = document.getElementById("total"),
		personSum = 0,
		daysSum = 0,
		total = 0;

	totalValue.innerHTML = 0;

	persons.addEventListener("change", function () {
		personSum = +this.value;
		let placeCoefficient = place.options[place.selectedIndex].value;
		total = ((daysSum + personSum) * 4000) * placeCoefficient;

		if (persons.value == "" || persons.value == 0 || restDays.value == "" || restDays.value == 0) {
			totalValue.innerHTML = 0;
		} else {
			var i = 0;
			let timerForCalc = setInterval(() => {
				totalValue.innerHTML = i;
				i = i + 50;
				if (i > total) {
					clearInterval(timerForCalc);
				}
			}, 1);
		}
	});

	restDays.addEventListener("change", function () {
		daysSum = +this.value;
		let placeCoefficient = place.options[place.selectedIndex].value;
		total = (daysSum + personSum) * 4000 * placeCoefficient;

		if (persons.value == "" || restDays.value == "" || restDays.value == 0 || persons.value == 0) {
			totalValue.innerHTML = 0;
		} else {
			var i = 0;
			let timerForCalc = setInterval(() => {
				totalValue.innerHTML = i;
				i = i + 50;
				if (i > total) {
					clearInterval(timerForCalc);
				}
			}, 1);
		}
	});

	persons.addEventListener("keyup", function () {
		var numRus = new RegExp("[0-9]");
		var cutString = persons.value;
		var cutStringLen = persons.value.length;

		if (numRus.test(cutString.substr(-1))) {
		} else {
			cutString = cutString.substring(0, cutStringLen - 1);
			persons.value = cutString;
		}
	});

	restDays.addEventListener("keyup", function () {
		var numRus = new RegExp("[0-9]");
		var cutString = restDays.value;
		var cutStringLen = restDays.value.length;

		if (numRus.test(cutString.substr(-1))) {
			// console.log("match");
		} else {
			cutString = cutString.substring(0, cutStringLen - 1);
			restDays.value = cutString;
		}
	});

	place.addEventListener("change", function () {
		if (persons.value == "" || restDays.value == "" || restDays.value == 0 || persons.value == 0) {
			totalValue.innerHTML = 0;
		} else {
			let a = (daysSum + personSum) * 4000 * this.options[this.selectedIndex].value;
			totalValue.innerHTML = a;
		}
	});
});