const express = require("express");
const app = express();
const https = require("https");
const url = require('url');
const cors = require("cors");       //�ǵ�ɾcors
app.use(cors());
const Guradian_home_url = "https://content.guardianapis.com/search?api-key=keys&section=(sport|business|technology|politics)&show-blocks=all";
const Guradian_tab_url1 = "https://content.guardianapis.com/";
const Guradian_tab_url2 = "?api-key=keys&show-blocks=all";

const NYTime_home_url = "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=keys";
const NYTime_tab_url1 = "https://api.nytimes.com/svc/topstories/v2/";
const NYTime_tab_url2 = ".json?api-key=keys";


const autosuggest_url = "https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=keys";

const port = process.env.PORT || 7000;
//for test
app.get("/api", function (request, response) {
    response.send("Hi");
})

//suggest search
app.get("/api/Search", function (req, res) {
    var cur_url = "";
    var params = url.parse(req.url, true).query;
    if (params.source == 'G') {
        cur_url = 'https://content.guardianapis.com/search?q=' + params.keyword + '&api-key=keys&show-blocks=all'
    }
    else if (params.source == 'N') {
        cur_url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + params.keyword + '&api-key=keys'
    }
    //console.log("Search")
    https.get(cur_url, function (response) {
        var res_text = "";
        response.on("data", function (data) {
            res_text += data;
        });
        response.on("end", function () {
            var result = JSON.parse(res_text);
            console.log(result);
            return res.send(result);
        });
    });
})

//Detail page
app.get("/api/Detail", function (req, res) {
    var cur_url = "";
    var params = url.parse(req.url, true).query;
    if (params.source == 'G') {
        cur_url = "https://content.guardianapis.com/" + params.link + "?api-key=keys&show-blocks=all";
    }
    else {
        cur_url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:(%22" + params.link + "%22)&api-key=keys";
    }
    //console.log("Detail")


    https.get(cur_url, function (response) {
        var res_text = "";
        response.on("data", function (data) {
            res_text += data;
        });
        response.on("end", function () {
            var result = JSON.parse(res_text);
            console.log(result);
            return res.send(result);
        });
    });
})

//general NYTime source
app.get("/api/NYTime", function (req, res) {
    var params = url.parse(req.url, true).query;
    var cur_url = "";
    if (params['cate'] == "all") {
        console.log(params['cate'])
        cur_url = NYTime_home_url;
    }
    else {
        console.log(params['cate'])
        cur_url = NYTime_tab_url1 + params['cate'] + NYTime_tab_url2;
    }
  
    https.get(cur_url, function (response) {
        var res_text = "";
        response.on("data", function (data) {
            res_text += data;
        });
        response.on("end", function () {
            var result = JSON.parse(res_text);

            return res.send(result);
        });
    });
});

//general Gurdian source
app.get("/api/Gurdian", function (req, res) {
    var params = url.parse(req.url, true).query;
    var cur_url = "";
    if (params['cate'] == "all") {
        cur_url = Guradian_home_url;
    }
    else {
        cur_url = Guradian_tab_url1 + params['cate'] + Guradian_tab_url2;
    }
    
    https.get(cur_url, function (response) {
        var res_text = "";
        response.on("data", function (data) {
            res_text += data;
        });
        response.on("end", function () {
            var result = JSON.parse(res_text);

            return res.send(result);
        });
    });
});

app.listen(port, function () {
    console.log("Start");
});
