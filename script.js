const ctx = document.getElementById("riskChart");

let chart = new Chart(ctx, {
type: 'doughnut',
data: {
datasets: [{
data: [0,100],
backgroundColor: [
'#00ff88',
'#e5e7eb'
],
borderWidth:0
}]
},
options:{
rotation:-90,
circumference:180,
cutout:'75%',
plugins:{
legend:{
display:false
}
}
}
});

document.getElementById("predictForm")
.addEventListener("submit",function(e){

e.preventDefault();

let age = Number(document.getElementById("age").value);
let bp = Number(document.getElementById("bp").value);
let chol = Number(document.getElementById("chol").value);
let hr = Number(document.getElementById("hr").value);

let risk = 0;

if(age>50) risk+=25;
if(bp>140) risk+=25;
if(chol>240) risk+=25;
if(hr<120) risk+=25;

if(risk>100) risk=100;

chart.data.datasets[0].data = [risk,100-risk];

if(risk<40){
chart.data.datasets[0].backgroundColor=['#00ff88','#e5e7eb'];
}

else if(risk<70){
chart.data.datasets[0].backgroundColor=['#ffcc00','#e5e7eb'];
}

else{
chart.data.datasets[0].backgroundColor=['#ff2d55','#e5e7eb'];
}

chart.update();

document.getElementById("riskPercentage").innerHTML =
risk + "%";

const status =
document.getElementById("riskStatus");

const recommendation =
document.getElementById("recommendation");

if(risk<40){

status.className="status low";
status.innerHTML="Low Risk";

recommendation.innerHTML=
"✅ Healthy condition.<br>Maintain exercise and balanced diet.";

}

else if(risk<70){

status.className="status medium";
status.innerHTML="Moderate Risk";

recommendation.innerHTML=
"⚠ Lifestyle changes recommended.<br>Regular checkups advised.";

}

else{

status.className="status high";
status.innerHTML="High Risk";

recommendation.innerHTML=
"🚨 Consult a cardiologist immediately.<br>Monitor blood pressure and cholesterol.";

}

});
