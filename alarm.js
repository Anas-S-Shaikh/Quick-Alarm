//getting all dom elements
let message = document.getElementById('message');
let hours = document.getElementById('hours')
let minutes = document.getElementById('minutes')
let ampm = document.getElementById('ampm')
let seconds = document.getElementById('seconds')
let day = document.getElementById('day')
let month = document.getElementById('month')
let date = document.getElementById('date')
const alarmtune = new Audio('alarm.mp3');
// setting weekdays names array
const daysNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// setting months name array 
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//function to update time & date in dom
function getTimeValues() {
    const now = new Date();
    let nowHours = now.getHours();
    let now_am_pm;
    if (nowHours > 12) {
        nowHours = nowHours - 12;
        now_am_pm = 'PM';
    } else {
        now_am_pm = 'AM';
    }
    let nowMins = now.getMinutes();
    let nowSeconds = now.getSeconds();
    let nowDay = daysNames[now.getDay()]; // getDay method return an index of weekday starting from 0
    let nowMonth = monthNames[now.getMonth()]; // because javascript months count start from 0 
    let nowDate = now.getDate();

    // setting values to dom 
    // used terenary opertar to keep 0 before values when it is less then 10
    nowHours < 10 ? (hours.innerHTML = `0${nowHours}`) : (hours.innerHTML = nowHours);
    nowMins < 10 ? (minutes.innerHTML = `0${nowMins}`) : (minutes.innerHTML = nowMins);
    nowSeconds < 10 ? (seconds.innerHTML = `:0${nowSeconds}`) : (seconds.innerHTML = `:${nowSeconds}`);
    ampm.innerHTML = now_am_pm;
    day.innerHTML = nowDay;
    month.innerHTML = nowMonth;
    date.innerHTML = nowDate;
}
// to update time every second
setInterval(() => {
    getTimeValues();
}, 1000);

//getting alarm date and time from user

let dateInput = document.getElementById('dateInput');
let hourInput = document.getElementById('hourInput');
let minuteInput = document.getElementById('minuteInput');
let ampmInput = document.getElementById('ampmInput');
let setAlarm = document.getElementById('setAlarm'); //set alarm button

// Setting up an alarm
setAlarm.addEventListener('click', () => {
    let now = new Date();
    let alarmTime = new Date();
    alarmTime.setDate(dateInput.value);
    //to avoid 24hr format
    if (ampmInput.value == 'PM') {
        hourInput.value = (parseInt(hourInput.value) + 12) //the input value is by default a string and has to be converted for addition
    }
    alarmTime.setHours(hourInput.value);
    alarmTime.setMinutes(minuteInput.value);
    alarmTime.setSeconds(0);
    let timeToAlarm = alarmTime - now; //returns the miliseconds left to play alarm
    //reseting the input value
    dateInput.value = null;
    hourInput.value = null;
    minuteInput.value = null;
    //manuplatign DOM according to situation
    let str = ``;
    //checking if date and time is valid to set an alarm or not
    if (timeToAlarm > 0) {
        setTimeout(() => {
            playOrStopAlarm(true);
        }, timeToAlarm);
        str = `<h3  style="color : green">Alarm will play on ${alarmTime.toLocaleString()}</h3>`;

    } else {
        str = `<h3 style="color : red">Please enter a valid date and time!</h3>`;
    }
    message.innerHTML = str;
})

// function to play and stop alarm as well as to change the message in DOM

playOrStopAlarm = (condition) => {
    if (condition) {
        alarmtune.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
        alarmtune.play();
        setAlarm.style.display = 'none';
        message.innerHTML = `<h3>Alarm is playing!</h3>
        <button class="btn stopBtn" onclick= playOrStopAlarm(false)>Stop</button>`; //calling playalarm function with false args on click of stop button
    } else {
        alarmtune.pause();
        setAlarm.style.display = 'block';
        message.innerHTML = `<h3>Enter date and time to set an alarm.</h3>`;
    }
};