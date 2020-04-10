const deg =6;
let hrhand = document.getElementById("hourhand");
let mnhand = document.getElementById("minutehand");
let schand = document.getElementById("secondhand");



setInterval(() => {
    let date = new Date()
    let hour = date.getHours() *30
    let minute = date.getMinutes() *deg;
    let sec = date.getSeconds() *deg;
    hrhand.style.transform = `rotateZ(${hour+(minute/12)}deg)`;
    mnhand.style.transform = `rotateZ(${(minute)}deg)`;
    schand.style.transform = `rotateZ(${sec}deg)`; 
},1000);
