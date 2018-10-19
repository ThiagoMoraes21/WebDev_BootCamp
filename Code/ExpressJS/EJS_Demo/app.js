var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static("public"));
// tells express that the files will be .ejs files
// that way you don't need to explicit declares that
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
});

app.get("/drama/:picture", function(req, res){
  var picture = req.params.picture;
  res.render("drama", {dramaPic : picture});
});

app.get("/posts", function(req, res){
  var posts = [
    {
      title: "Duro de matar",
      author: "John McTiernan",
      img : "https://i.pinimg.com/originals/f8/46/e4/f846e4d7aa3aa6b7c82799e4745f8ab1.jpg"
    },
    {title: "Alien",
     author: "Ridley Scott",
     img: "https://vaguevisages.com/wp-content/uploads/2017/05/alien-3-movie-one.png"
   },
    {
      title: "Jurassic Park",
      author: "Steven Spilberg",
      img: "https://c-8oqtgrjgwu46x24epgv3x2eedukuvcvkex2eeqo.g00.cnet.com/g00/3_c-8yyy.epgv.eqo_/c-8OQTGRJGWU46x24jvvrux3ax2fx2fepgv3.edukuvcvke.eqox2fkoix2fZGcy1x78fKXFoeoECFfzvviZ_GjLmx3dx2f3822z122x2f4230x2f25x2f52x2f96731c5g-6gdh-6ef8-0765-73770033gdh2x2flwtcuuke-rctm-v-tgz.lrix3fk32e.octmx3dkocig_$/$/$/$/$/$/$/$/$"
     }
  ];
  res.render("posts", {posts: posts});
});

app.listen(port, function(){
  console.log("Server running on port " + port);
});
