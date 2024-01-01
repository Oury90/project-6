import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 5000;

const api_key = "dc08db6cfe7a3b9491b339dcef23aedd";
const api_news = "35abd19df7664a0391cc4e5f7fffa94b";

// https://newsapi.org/v2/top-headlines?country=us&apiKey=35abd19df7664a0391cc4e5f7fffa94b

async function getNews(){
    const newsInfo = await axios(`https://newsapi.org/v2/top-headlines?country=us&apiKey=35abd19df7664a0391cc4e5f7fffa94b`)
    return newsInfo.data.articles;
}
getNews()
async function getData(){
    const response = await axios (`https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=${api_key}&units=metric`);
    return response.data;
}

app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/", async (req, res) =>{
    try {
        const response = await getData();
        const dataInfos = await getNews();
        
        res.render("index.ejs", {
            datas:  response,
            infos: dataInfos
        })
    } catch (error) {
        console.error({message: "Data not found"});
    }
})



app.listen(port, () =>{
    console.log(`This server is running on port ${port}`)
})