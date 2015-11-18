Firebase.enableLogging(true);
var received = new Firebase('https://*.firebaseio.com/received');
var sent = new Firebase('https://*.firebaseio.com/sending');

// Attach an asynchronous callback to read the data at our posts reference
received.on("value", function(snapshot) {
  var obj = snapshot.val();

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        var date = new Date(key*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        var res = obj[key].split(",");
        var data = formattedTime + "\t" + res[0] + "\t" + res[1] + "<br />";
        document.getElementById('texts').innerHTML += data;
    }
  }

}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

document.getElementById("sendText").onclick = function () {
    var time = Math.floor(Date.now());
    var toAddress = document.getElementById('toAddress').value;
    var message = document.getElementById('message').value;

    var obj = {};
    obj[time] = toAddress + "," + message;
    sent.set(obj);
};