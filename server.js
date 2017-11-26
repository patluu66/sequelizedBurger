var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));

app.set("view engine", "handlebars");

var routes = require("./controllers/burger-controller");
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);


db.sequelize.sync({ force: true}).then(function() {
	app.listen(PORT, function() {
		console.log("App listening on PORT " + PORT);
	});
});

