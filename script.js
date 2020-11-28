const background = document.querySelector('.background')
const author = document.querySelector(".author")
const icon = document.querySelector('.icon')
const details = document.querySelector('.details');
const period = document.querySelector(".period");
const expand = document.querySelector('.expand');

function getQuote() {
  axios.get('https://api.quotable.io/random').then((quotesRes) => {
  const chosenQuote = quotesRes.data

  document.getElementById("quote").textContent = chosenQuote.content;
	
	if (chosenQuote.author == null) {
		author.textContent = 'Unknown author'
	} else {
		author.textContent = chosenQuote.author;
	}
  }).catch((err) => console.error(err))
}

function getTime() {
  let currentTime = new Date();
  let hour = currentTime.getHours()
  let minute = currentTime.getMinutes();

  //Time of day
  let greet = '';
  if (hour >= 5 && hour <= 11) {
    greet = 'morning';
  } else if (hour >= 12 && hour <= 17) {
    greet = 'afternoon';
  } 
  else {
    greet = 'evening';
  }
	document.querySelector('.currently__greeting').textContent = `good ${greet}`
	
	//Bg and icon
	if (hour >= 5 && hour <= 17 ) {
		background.classList.add('day');
		icon.src = './assets/desktop/icon-sun.svg';
		icon.setAttribute("alt", "sun icon");
	} else {
		background.classList.add('night');
		icon.src = './assets/desktop/icon-moon.svg';
		icon.setAttribute("alt", "moon icon");
		details.style.color = '#fff';
		details.style.background = 'rgba(0, 0, 0, 0.75)';
	}
  
	// Time setup
  if(minute < 10){
    minute = "0" + minute
	}
  
  if (hour === 0) {
    hour = 12
    period.textContent = "am";
  } else if (hour === 12) {
    period.textContent = "pm";
  } else if (hour > 12) {
    hour -= 12;
    period.textContent = "pm";
  } else {
    period.textContent = "am";
	}
	document.querySelector(".time-now").textContent = `${hour}:${minute}`;
	
	//Update time
	let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
  setTimeout(getTime,interval)
}

function getTimeZone() {
  axios.get('https://worldtimeapi.org/api/ip')
  .then((regionRes) => {
    const region = regionRes.data;
    //Local timezone
    document.querySelector('.region').textContent = region.abbreviation
    //Details
    document.getElementById('timezone').textContent = region.timezone;
    document.getElementById('year-day').textContent = region.day_of_year;
    document.getElementById('week-day').textContent = region.day_of_week;
    document.getElementById('week-number').textContent = region.week_number;
  })
  .catch(err => console.error(err));
}

function getLocation() {
  axios.get('https://freegeoip.app/json/')
  .then((locationRes) => {
    const ipLocation = locationRes.data;
    const regionName = ipLocation.region_name;
    const countryCode = ipLocation.country_code;
    document.querySelector('.currently__location').textContent = `in ${regionName}, ${countryCode}`;
  })
  .catch(err => console.error(err));
}

// Promise
//   .all([
//     axios.get("https://type.fit/api/quotes"),
//     axios.get('https://worldtimeapi.org/api/ip'),
//     axios.get("https://freegeoip.app/json/")
//   ]).catch(() => null)
//   .then(
//     axios.spread((quotes, time, location) => {
//       // Display quotes
//       const quotesArray = quotes.data;
//       getQuote(quotesArray);

//       //Time now - user location
//       const currently = time.data;      
//       getRegion(currently)
//       getDetails(currently);

//       //Location
//       const ipLocation = location.data;
//       getLocation(ipLocation);
//     })
//   )
//   .catch((err) => console.error(err));

getTime();
getQuote();
getTimeZone();
getLocation()

//Event listeners
function showDetails() {
  document.querySelector('.top-widgets').classList.toggle('transform');
  details.classList.toggle('transform');
  
  if (expand.firstChild.nodeValue === "More") {
    expand.firstChild.nodeValue = "Less"
  } else {
    expand.firstChild.nodeValue = "More"
  }

  const arrow = document.querySelector('.arrow');
  arrow.classList.toggle('rotate');
}
expand.addEventListener('click', showDetails);

//Random quote
document.getElementById('refresh').addEventListener('click', getQuote)

