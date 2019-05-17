function fetchData(action) {
    let timeStart = document.getElementById('start').value;
    let timeStop = document.getElementById('stop').value;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var data = JSON.parse(this.responseText);
          createGraphs(data, timeStart, timeStop);
      }
    }
    xmlhttp.open("POST", "requestdata.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(action === "default") {
      xmlhttp.send("action=" + action);
    }
  }

function createGraphs(data, timeStart, timeStop){
    timeStart = Date.parse(timeStart);
    timeStop = Date.parse(timeStop);
    var dataset = [];
    var labelsData = [];
    var bgColor = [];
    var borderColor = [];
    data[0].forEach(function (e, i) {     
      if (Date.parse(e.time) >= timeStart && Date.parse(e.time) <= timeStop) {
              labelsData.push(e.time);
              dataset.push(e.niiskus);
              bgColor.push('rgba(' + Math.random() * 255 +', ' + Math.random() * 255 +', '+Math.random()*255+', 0.2)');
              borderColor.push('rgba(' + Math.random() * 255 + ', ' + Math.random() * 255 + ', ' + Math.random() * 255 + ', 1)');
 
          
      }
    });
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: labelsData,
      datasets: [{
          label: 'niiskus',
          borderColor: 'rgb(255, 99, 132)',
          data: dataset
      }]
  },
  options: {
  }
});

var ctx = document.getElementById('myChart2').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelsData,
      datasets: [{
        label: 'temperatuur',
        data: dataset,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
  $('#myChart2').hide();
  $('#myChart').show();
}

function showChart(x) {
  switch(x) {
    case 0:
      $('#myChart2').hide();
      $('#myChart').show();
    break;
    
    case 1:
      $('#myChart2').show();
      $('#myChart').hide();
    break;
  }
}