var fs = require('fs');

// json file with the data
var data = fs.readFileSync('../news.json');

var news = JSON.parse(data);
const express = require("express");
const app = express();

// To solve the cors issue
const cors=require('cors');
	
app.listen(process.env.PORT || 3000,
	() => console.log("Server Start at the Port"));
	
app.use(express.static('public'));
app.use(cors());

// when get request is made, alldata() is called
app.get('/news', alldata);

function alldata(request, response) {
	
	// Returns all information about the news
	response.send(news);
}

app.get('/news/:news/', searchNews);

function searchNews(request, response) {
	var word = request.params.element;
	word = word.charAt(0).toUpperCase()
		+ word.slice(1).toLowerCase();
	
	if(news[word]) {
		var reply = news[word];		
	}
	else {
		var reply = {
			status:"Not Found"
		}
	}
	
	response.send(reply);
}
