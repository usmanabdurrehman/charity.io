let router = require("express").Router();
let User = require("../Models/User");
let Event = require("../Models/Event");
let bcrypt = require("bcryptjs");
let multer = require("multer");

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/eventImages");
	},
	filename: function (req, file, cb) {
		let [filename, ext] = file.originalname.split(".");
		req.filename = `${req.user.email}-${filename}-${Date.now()}.${ext}`;
		cb(null, req.filename);
	},
});

var upload = multer({ storage: storage });

const UNEXPECTED_ERROR = "Sorry, Something occured unexpectedly";

router.post("/createEvent", upload.any(), (req, res) => {
	let { name, zipcode, description, start, end } = req.body;
	let newEvent = new Event({
		name,
		zipcode,
		start,
		end,
		image: req.filename,
		organizer: req.user.email,
	});
	newEvent
		.save()
		.then(() => {
			res.send({
				status: true,
				msg: "New event has been added",
				appearance: "success",
			});
		})
		.catch(() => {
			res.send({
				status: false,
				msg: UNEXPECTED_ERROR,
				appearance: "error",
			});
		});
});

router.get("/events", (req, res) => {
	Event.find({ organizer: req.user.email })
		.lean()
		.then((events) => {
			events = events.map((event) => {
				let startDate = new Date(event.start);
				let endDate = new Date(event.end);
				return {
					...event,
					start: `${startDate.getDate()}/${startDate.getMonth()}/${startDate.getFullYear()}`,
					end: `${endDate.getDate()}/${endDate.getMonth()}/${endDate.getFullYear()}`,
				};
			});
			res.send({
				status: true,
				events,
			});
		})
		.catch(() => {
			res.send({
				status: false,
				msg: UNEXPECTED_ERROR,
				appearance: "error",
			});
		});
});

router.post("/updateEvent", (req, res) => {
	let { id, name, zipcode, start, end, volunteers } = req.body;
	let updatedEvent = {
		name,
		zipcode,
		start,
		end,
		volunteers,
	};
	Event.findByIdAndUpdate(id, { updatedEvent })
		.then(() => {
			res.send({ status: true, msg: "Event has been updated" });
		})
		.catch(() => {
			res.send({
				status: false,
				msg: UNEXPECTED_ERROR,
				appearance: "error",
			});
		});
});

router.post("/searchEvents", (req, res) => {
	let { name, zipcode, volunteer, start, end } = req.body;

	Event.find({
		name: new RegExp(email, "i"),
		zipcode: new RegExp(zipcode, "i"),
		volunteers: volunteer,
		start: { $gt: start },
		end: { $lt: end },
	})
		.then((events) => {
			res.send({ status: true, events });
		})
		.catch(() => {
			res.send({
				status: false,
				msg: UNEXPECTED_ERROR,
				appearance: "error",
			});
		});
});

module.exports = router;
