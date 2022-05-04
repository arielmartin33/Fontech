const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const methodOverride = require('method-override');
const app = express();

const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

//middleware

app.use(methodOverride('_method'));


app.use(
  session({
    secret: "Frase secreta",
    //estas dos lineas son para que no salga el error Deprecated!!
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

const productRoutes = require("./routes/productRoutes");
const mainRoutes = require("./routes/mainRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/", mainRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("servidor corriendo en puerto " + port);
});
