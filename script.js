const body = document.body;


function getTime(currentHour, currentMinutes, currently) {

	const region = document.querySelector('.region');
	const greeting = document.querySelector('.currently__greeting')
	const icon = document.querySelector('.icon')
	const period = document.querySelector(".period");
	const time = document.querySelector(".time-now");

	region.innerHTML = currently.abbreviation;
	
	if (currentHour >= 5 && currentHour <= 17 ) {
		body.classList.add('day');
		icon.src = './assets/desktop/icon-sun.svg';
		icon.setAttribute("alt", "sun icon");
	} else {
		body.classList.add('night');
		icon.src = './assets/desktop/icon-moon.svg';
		icon.setAttribute("alt", "moon icon");
	}

	//Greeting and icon
	if (currentHour >= 5 && currentHour <= 11) {
		greeting.innerHTML = "good morning";
	} else if (currentHour >= 12 && currentHour <= 17) {
		greeting.innerHTML = "good afternoon";
	} 
	else {
		greeting.innerHTML = "good evening";
	}

	//Time setup
	if (currentHour > 12) {
		currentHour -= 12;
		period.innerHTML = "pm";
	} else {
		currentHour;
		period.innerHTML = "am";
	}

	if (currentMinutes < 10) {
		currentMinutes = "0" + currentMinutes;
	}

	time.innerHTML = `${currentHour}:${currentMinutes}`;
}


function getLocation(ipLocation) {
	const zone = document.querySelector('.country');

	const regionName = ipLocation.region_name;
	const countryCode = ipLocation.country_code;
	zone.innerHTML = `in ${regionName}, ${countryCode}`;
}


function getQuote(quotesArray) {
	let index = Math.floor(Math.random() * quotesArray.length);
	let chosenQuote = quotesArray[index];

	document.getElementById("quote").textContent = chosenQuote.text;
	document.querySelector(".author").innerHTML = chosenQuote.author;
}


function getDetails(currently) {
	const timeZone = document.getElementById('timezone');
	const dayOfYear = document.getElementById('year-day');
	const weekDay = document.getElementById('week-day');
	const weekNumber = document.getElementById('week-number');

	timeZone.innerHTML = currently.timezone;
	dayOfYear.innerHTML = currently.day_of_year;
	weekDay.innerHTML = currently.day_of_week;
	weekNumber.innerHTML = currently.week_number;
}


Promise
	.all([
		axios.get("https://freegeoip.app/json/"), //city and country under time
		axios.get("https://worldtimeapi.org/api/ip"), //time based on ip address and info on expanded state
		axios.get("https://type.fit/api/quotes")
	]).catch(() => null)
	.then(
		axios.spread((location, time, quotes) => {
			//Region
			const ipLocation = location.data;
			getLocation(ipLocation);

			//Time now
			let currently = time.data;
			let currentTime = new Date(time.data.datetime);
			let currentHour = currentTime.getHours();
			let currentMinutes = currentTime.getMinutes();

      getTime(currentHour, currentMinutes, currently);

			getDetails(currently);

			// Display quotes
			let quotesArray = quotes.data;

			getQuote(quotesArray);
			
			document.getElementById('refresh').addEventListener('click', getQuote)
		})
	)
	.catch((err) => console.error(err));



const expand = document.querySelector('.expand');

function showDetails() {
	body.classList.toggle('transform');

	if (expand.firstChild.nodeValue === "More") {
		expand.firstChild.nodeValue = "Less"
	} else {
		expand.firstChild.nodeValue = "More"
	}

	const arrow = document.querySelector('.arrow');
	arrow.classList.toggle('rotate');
}

// document.getElementById('refresh').addEventListener('click', getQuote);
expand.addEventListener('click', showDetails);