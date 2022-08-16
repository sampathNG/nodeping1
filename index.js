require("dotenv").config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ping = require('ping');
const res = require('express/lib/response');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.get('/', function(req, res){
  res.send("Hello World!")
  console.log("Hello World!")
})


app.get("/server_test",async (req, res) => {
  try {
  const result = await ping.promise.probe('45.32.134.75', {
    timeout: 10,
    extra: ["-i", "2"],
  });
  if(result.alive){
    res.status(200).send("OK");
  }else{
    res.status(404).send();
  }
} catch (error) {
  res.send(error)
  console.log({error: error.message});
}
})

app.get("/server",(req, res) => {
  var cfg = {
    timeout: 10,
    // WARNING: -i 2 may not work in other platform like windows
    extra: ['-i', '2'],
};
var hosts = ['45.32.134.75'];
// hosts.forEach(function(host){
//     ping.sys.probe(host, function(isAlive){
//         var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
//         res.send(msg);
//         console.log(msg);
//     }, cfg);
// });
hosts.forEach(function (host) {
  // WARNING: -i 2 argument may not work in other platform like windows
  ping.promise.probe(host, {
      timeout: 10,
      extra: ['-i', '2'],
  }).then(function (k) {
      console.log(k.alive);
      res.status(200).send("OK");
      // if(k.alive){
      //   res.status(200).send("OK")
      //   console.log(k.alive)
      // }else{
      //   res.status(404).send()
      // }
  })
  .catch(function (err) {
    res.send(err);
    console.log(err);
  });
});

})

const port = process.env.PORT

app.listen(port,console.log(`running on port ${port}`))