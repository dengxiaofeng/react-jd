"use strict";

let express = require('express');
let router = express.Router();
let fs = require('fs');

let dataBase = null;
let readFileData = () => {
	let promise = new Promise((resolve, reject) => {
		fs.readFile("./public/database/database.json", "utf-8", (err, data) => {
			if(err) {
				console.log(err);
				reject("read filedata error!");
			}else {
				data = JSON.parse(data);
				dataBase = data;
				resolve();
			}
		})
	});
	return promise;
}

let getFileName = (path, fileClass) => {
	let promise = new Promise((resolve, reject) => {
		fs.readdir(path, (err, files) => {  
	        if (err) {  
	            reject("read fileName err!")
	        } else {  
	        	files = files.map((file) => {
	        		return "http://localhost:3000/images/" + fileClass + "/" + file;
	        	});
	        	resolve(files);
	        }         
	    }); 
	});
	return promise;
}

let imgNames = [];
let appNames = [];
let spikeNames = [];
let moreNames = [];
let likeNames = [];

readFileData().then(() => {
	getFileName("./public/images/swiper", "swiper").then((files) => {
		imgNames = files;
	},() => {
		console.log(err);
		imgNames = false;
	});

	getFileName("./public/images/otherapp", "otherapp").then((files) => {
		let obj = dataBase.otherapp;
		appNames = files.map((file, index) => {
			obj[index].icon = file;
			return obj[index];
		});
	},() => {
		console.log(err);
	});

	getFileName("./public/images/spike", "spike").then((files) => {
		let obj = dataBase.spike.store;
		spikeNames = files.map((file, index) => {
			obj[index].icon = file;		
			return obj[index];
		});
	},() => {
		console.log(err);
	})

	getFileName("./public/images/more", "more").then((files) => {
		moreNames = files.map((file, index) => {
			return {
				icon: file,
				url: dataBase.more[index],
			}
		});
	},() => {
		console.log(err);
	})

	getFileName("./public/images/like", "like").then((files) => {
		let obj = dataBase.like;
		likeNames = files.map((file, index) => {
			obj[index].icon = file;
			return obj[index];
		})
	},() => {
		console.log(err);
	})


}, (err) => {
	console.log(err);
})


exports.swiper = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: "",
	}
	if(imgNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = imgNames;
	}else {
		sendData.msg = "error";
	}
	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.otherapp = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}
	
	if(appNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = appNames;
		
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.spike = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
		times: "",
		more: "",
	}
	
	if(spikeNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = spikeNames;
		sendData.times = dataBase.spike.times;
		sendData.more = dataBase.spike.more;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.more = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}
	
	if(moreNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = moreNames;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};

exports.like = (req, res) => {
	let reg = /\?callback=(.*)/;
	let callback = reg.exec(req.url)[1];
	const sendData = {
		status: 0,
		msg: "",
		data: [],
	}
	
	if(likeNames) {
		sendData.status = 1;
		sendData.msg = "success";
		sendData.data = likeNames;
	}else {
		sendData.msg = "error";
	}

	let json = JSON.stringify(sendData);
  	res.send(callback + '(' + json + ')');
};



