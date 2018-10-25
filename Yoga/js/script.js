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
});