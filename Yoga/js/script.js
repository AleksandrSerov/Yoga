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
});