const port = 4000;
const app = require("express")();
const cors = require("cors");
const http = require("http").createServer(app);
const socketIo = require('socket.io')(http, {
	cors: {
		origin: "http://localhost:4000",
		credentials: true
	}
});

const socket = require("./src/socket");

app.use(
	cors({ origin: "http://localhost:3000" , credentials: true})
)

http.listen(port, () => {
	console.log(`
		###### server is running on ${port} ${new Date().toLocaleString()} ######
	`);
})
