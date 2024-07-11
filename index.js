const express = require('express')
const app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs')
const mongoose = require('mongoose')
let signinM = ''

app.use(express.urlencoded({extended:true}))
let userarray = []
// schema is a blueprint on how you want your data to be like
// model is like collection of what you want to do,

const user_schema = mongoose.Schema(
    {firstname:{type:String,required:true},
    lastname:{type:String, required:true},
    email:{type:String,required:true,lowercase:true,unique:true,index:true},
    password:{type:String, required:true,minLength:[5,"Password can't be short"]}  

}
)
const user_model = mongoose.model("user_collection", user_schema)
app.get("/",(request, response) =>{
// response.send('Welcome to our restaurant')
// response.send(
//     [S
//     {name:'Aishat', class:'Node' },
//     {name:'Timi', class:'React' },
//     {name:'David', class:'javaScript' },
//     { name:'Umar', class:'html'}
//     ]
// response.sendFile(__dirname + "/index.html")
// console.log(__dirname, "dir");

response.render("index", {name: "tola"})

})

app.get("/signup",(req ,res)=>{
    res.render("signup",{message:""})
})

app.get("/login", (req, res)=>{
    res.render("login",{message: signinM})
})
// to have access to information you are sendining you use req.body
app.post("/signup", async (req,res)=>{
// console.log(req.body);
const {firstname, lastname, email, password} = req.body
try {
    const user = await user_model.create(req.body)
    console.log(user);

    // if (!user) {
    //     console.log('Signin unsuccessful');

    // }
    console.log('sigin successful');
    res.redirect('/login')
     
} catch (error) {
   console.log(error); 
   res.render("signup",{message:"there is an error"})

}



// if(!firstname || !lastname ||!email ||!password){
//     console.log("input fields cannot be empty");
//     res.render("signup", {message:"input field cannot be empty"})
//     message = ""
// }else{
//     userarray.push(req.body);
// console.log(userarray);
//     res.redirect("/login")
// }

})

app.post("/signin", async (req, res)=>{
    // console.log(req.body);
    const {email, password} = req.body
    try {
        const user = await user_model.findOne({email: email })
        if (user) {
            if (user.password == password) {
                console.log('login successful');
                res.redirect("/")
            }else{
                console.log('password incorrect');
                signinM ='password incorrect'
                res.redirect("/login")
            }
        }else{
            console.log('incorrect email');
            res.render("login",{message: 'emailincorrect'})

        }
         console.log(user);
    } catch (error) {
        console.log(error);
    }

    
    // let existuser = userarray.find(e => e.email == email)
    // console.log(existuser);
    // if(existuser && existuser.password == password){
    //     console.log('login successful');
    //     res.redirect("/login")
       
    // }else{console.log("user not found, please sign up")};
})
// create function to start our node application
const port = 8006
app.listen(port, ()=>{
console.log(`app started at port ${port}`);
})
// listen takes in a callback

const uri = "mongodb+srv://bisoyeogunnaike:Jesusbaby101%40@cluster0.n876gfj.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0"
function connection(){

    try {
    const connect = mongoose.connect(uri)

        if (connect) {
            console.log('connected to database');
        }
    } catch (error) {
        console.log(error);
    }
}
connection()