const body = document.body;
const widgets = document.querySelector('.widgets');
const icon = document.querySelector('.icon')
const details = document.querySelector('.details');
const background = document.querySelector('.background')

function getQuote(quotesArray) {
  let index = Math.floor(Math.random() * quotesArray.length);
	let chosenQuote = quotesArray[index];
	
  document.getElementById("quote").textContent = chosenQuote.text;
	
	const author = document.querySelector(".author")
	if (chosenQuote.author == null) {
		author.textContent = 'Unknown author'
	} else {
		author.textContent = chosenQuote.author;
	}
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
		widgets.classList.add('day');
		icon.src = './assets/desktop/icon-sun.svg';
		icon.setAttribute("alt", "sun icon");
	} else {
		widgets.classList.add('night');
		icon.src = './assets/desktop/icon-moon.svg';
		icon.setAttribute("alt", "moon icon");
		details.style.color = '#fff';
		details.style.background = 'rgba(0, 0, 0, 0.75)';
	}
  
	// Time setup
  if(minute < 10){
    minute = "0" + minute
	}
	
	const time = document.querySelector(".time-now");
	const period = document.querySelector(".period");
  if (hour > 12) {
    hour -= 12;
    period.textContent = "pm";
  } else {
    period.textContent = "am";
	}
	time.textContent = `${hour}:${minute}`;
	
	//Update time
	let interval = (60 - (new Date()).getSeconds()) * 1000 + 5;
  setTimeout(getTime,interval)
}

function getRegion(currently) {
	document.querySelector('.region').textContent = currently.abbreviation;
}

function getLocation(ipLocation) {
  const zone = document.querySelector('.country');
  const regionName = ipLocation.region_name;
  const countryCode = ipLocation.country_code;
  zone.textContent = `in ${regionName}, ${countryCode}`;
}


function getDetails(currently) {
  const timeZone = document.getElementById('timezone');
  const dayOfYear = document.getElementById('year-day');
  const weekDay = document.getElementById('week-day');
  const weekNumber = document.getElementById('week-number');

  timeZone.textContent = currently.timezone;
  dayOfYear.textContent = currently.day_of_year;
  weekDay.textContent = currently.day_of_week;
  weekNumber.textContent = currently.week_number;
}


Promise
  .all([
    axios.get("https://type.fit/api/quotes"),
    // axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://worldtimeapi.org/api/ip`)
    axios.get('https://worldtimeapi.org/api/ip'), //time based on ip address and info on expanded state
    axios.get("https://freegeoip.app/json/") //city and country under time
  ]).catch(() => null)
  .then(
    axios.spread((quotes, time, location) => {
      // Display quotes
      let quotesArray = quotes.data;
      getQuote(quotesArray);

      //Time now
      let currently = time.data;
      // let currentTime = new Date(time.data.datetime);
      
      getRegion(currently)
      getDetails(currently);

      //Location
      const ipLocation = location.data;
      getLocation(ipLocation);
    })
  )
  .catch((err) => console.error(err));

getTime();

//Event listeners
//Details button
const expand = document.querySelector('.expand');
function showDetails() {
  main.classList.toggle('transform');

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
document.getElementById('refresh').addEventListener('click', function(){
  axios.get('https://type.fit/api/quotes').then((quotesArray) => {
    getQuote(quotesArray.data)
  }).catch((err) => console.error(err))
})
