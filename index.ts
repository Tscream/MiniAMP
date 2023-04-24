import express from "express";
import apirouter from "./apirouter";

const app = express();
const port = 3000;


// setup
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req,res) => {
    res.send("hello")
});

// basic routing example
app.use("/api", apirouter);

app.listen(port, () => {
    console.log(`listening on ${port}`)
});