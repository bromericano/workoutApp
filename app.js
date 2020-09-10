const express = require("express"),
	  app = express(),
	  mongoose = require("mongoose"),
	  bodyParser = require("body-parser"),
	  methodOverride = require("method-override");

mongoose.connect('mongodb://localhost:27017/workout_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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

//SHOW (show entry)
app.get("/workouts/:id", function(req,res) {
	Workout.findById(req.params.id, function(err, foundWorkout) {
		if(err) {
			console.log(err);
			res.redirect("/workouts");
		} else {
			res.render("show", {workout: foundWorkout});
		}
	});
});

//EDIT (Form to change entry)
app.get("/workouts/:id/edit", function(req, res) {
	Workout.findById(req.params.id, function(err, foundWorkout) {
		if(err) {
			console.log(err);
			res.redirect("/workouts");
		} else {
			res.render("edit", {workout: foundWorkout});
		}
	});
});

//UPDATE (Submit changes to be enacted)
app.put("/workouts/:id", function(req, res) {
	Workout.findByIdAndUpdate(req.params.id, req.body.workout, function(err, updatedWorkout) {
		if(err) {
			console.log(err);
			res.redirect("/workouts");
		} else {
			res.redirect("/workouts/" + req.params.id);
		}
	});
});

//DESTROY (Delete entry)
app.delete("/workouts/:id", function(req, res) {
	Workout.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			console.log(err);
			res.redirect("/workouts");
		} else {
			res.redirect("/workouts");
		}
	});
});






app.listen(3000, function() {
	console.log("Server started...");
});