const express = require("express")
const mongoose = require("mongoose")

const Article = require("./models/Article")
const { compile } = require("ejs")


const app = express()
app.use(express.json())


mongoose.connect("mongodb+srv://basel:Baselhammoud619@cluster0.07txps2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Connection sucessfully")
}).catch(()=>{
     console.log("Error with connection")
       }
    
)


app.get("/",(req,res)=>{
  res.send("root")
})



app.get("/hi",(req,res)=>{
    res.send("hi")
})



app.post("/post",(req,res)=>{
    res.send("post")
})


  
app.get("/calc",(req,res)=>{
    let num = "";
    for(let i = 0  ; i<= 5 ; i++){
        num += i + " " ;
        
    }
    res.render("numbers.ejs" ,{
        name:"bassel",
        numbers:num
    })
})



app.get("/findSum/:num1/:num2" ,(req,res)=>{
    const n1 = req.params.num1;
    const n2 = req.params.num2;
    const sum = Number(n1) + Number(n2);
   
    res.send(`sum : ${sum}`)
   
})


app.get("/sayhello/",(req,res)=>{
    // console.log(req.query.age)
    //  console.log(req.body.name)

   //  res.send(__dirname+"views/numbers.html")
    // res.sendFile(__dirname+"/views/numbers.html")

   // res.render("numbers.ejs")
    // res.json({
    //     name: req.body.name,
    //     age:req.query.age
    // })
})

app.post("/art", async (req,res)=>{
    const newArticle =  new Article()
    newArticle.title = req.body.myAricleTitle
    newArticle.body = req.body.myArticleBody
    await newArticle.save()

    res.json(newArticle)
})


app.get("/art/:articleId", async(req,res)=>{
    
   // const newArticle = await Article.find()
    
//    const id = req.params.articleId
   try{
        res.json(await Article.findById(req.params.articleId))
        return
   }
   catch(error){
       console.log("Error while reading article  ")
       return res.send("error")
   }

  
})




app.delete("/art/:articleId", async (req,res)=>{

  const id = req.params.articleId


  try{
    const article=await Article.findByIdAndDelete(id)
    res.json(article)
     return
  }
 catch(error){
       console.log("Error while deleting article of id ", id)
       return res.send("error")
   }


})





app.get("/allArticles",async (req,res)=>{

    const articles = await Article.find()
   res.render("allArticles.ejs",{
       allArticles:articles,
   })


})



app.listen(3000,()=>{
    console.log("Listining to port 3000 ...")
})