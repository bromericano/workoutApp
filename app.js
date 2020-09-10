const express = require("express"),
	  app = express(),
	  mongoose = require("mongoose"),
	  bodyParser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/workout_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//MONGOOSE MODEL/CONFIG
let workoutSchema = new mongoose.Schema ({
	name: String,
	image: String,
	notes: String,
	difficulty: String
});

let Workout = mongoose.model("Workout", workoutSchema);

app.get("/", function(req, res) {
	res.render("landing");
});

//INDEX (home page)
app.get("/workouts", function(req, res) {
	Workout.find({}, function(err, workouts) {
		if(err) {
			console.log(err);
		} else {
			res.render("index", {workouts: workouts});
		}
	})
});

//NEW (page to make a new entry)
app.get("/workouts/new", function(req, res) {
	res.render("new");
});

//CREATE (submit new entry and add to database)
app.post("/workouts", function(req, res) {
	Workout.create(req.body.workout, function(err, newWorkout) {
		if(err) {
			console.log(err);
			res.render("new");
		} else {
			res.redirect("/workouts", );
		}
	})
});

//VIEW (View entry)

//EDIT (Form to change entry)

//UPDATE (Submit changes to be enacted)

//DESTROY (Delete entry)







app.listen(3000, function() {
	console.log("Server started...");
});