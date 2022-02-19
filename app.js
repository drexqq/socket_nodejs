const app = require("express")();
const http = require("http").createServer(app);
const port = 3000;


app.get("/", (req, res) => {
	res.send("hello socket js");
})

http.listen(port, () => {
	console.log("Connected at "+port);
})
