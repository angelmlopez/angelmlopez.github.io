const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*
 * The 'express.static' middleware provides some services Express can use to
 * serve files from a directory - in this case, the 'public' subdirectory of
 * this project.
 *
 * The 'app.use' function attaches middleware to our Express application, so
 * that when the application is running, it can serve static files. In this
 * case, we mount it over the entire app: any web request that GETs a path that
 * exists in the 'public' directory will be handled by the middleware. The
 * middleware also serves the 'index.html' file in a directory (if it exists)
 * whenever a client requests the directory itself.
 *
 * The 'public' directory for this project, in turn, contains all the HTML,
 * Javascript, and CSS files needed to run a simple chat client connected to
 * this server. Accessing this server's root URL will serve 'public/index.html',
 * which contains our chat client. This gives users an easy way to connect to
 * the server and interact with other users.
 *
 * See also:
 *  - Express: Serving static files in Express
 *    https://expressjs.com/en/starter/static-files.html
 *  - Express: express.static()
 *    https://expressjs.com/en/4x/api.html#express.static
 *  - Express: Using middleware
 *    https://expressjs.com/en/guide/using-middleware.html
 *  - Express: app.use()
 *    https://expressjs.com/en/4x/api.html#app.use
 */
app.use(express.static("public"));

// this is a single route, in the simplest possible format
// the simplest format is not necessarily the best one.
// this is, right now, an introduction to Callback Hell
// but it is okay for a first-level example
app.get("/api", (req, res) => {
  const baseURL = "https://api.umd.io/v0/courses?dept_id=INST";
  var count = 0;
  fetch(baseURL)
    .then(res => res.json())

    .then(res => res.map(r => r))

    .then(r => {
      text2 = "<ul>";
      for (i = 0; i < r.length; i++) {
        //concatinating route title and id as list items
        text2 += "<li> " + r[i].course_id + " : " + r[i].name + " </li>";
      } //END for loop
      text2 += "</ul>";
      document.querySelector(".content").innerHTML = text2;
      return r;
    }) //end then

    //.then(data => (document.querySelector(".content").innerHTML = data));

    .then(res => {
      var x = document.getElementsByClassName("header");

      //creating a random number
      var randoNumber = Math.floor(Math.random() * res.length);
      var rTitle = res[randoNumber].name;
      var rID = res[randoNumber].course_id;

      function checkMatch(arg1, arg2) {
        if (arg1.search(arg2) == -1) {
          return arg1;
        } else if (arg1.match(rID).length >= 1) {
          arg1 = arg1.replace(rID, "");
          return arg1;
        }
      }

      rTitle = checkMatch(rTitle, rID);

      x[0].innerHTML = "UMD Bus Route " + rID + " " + rTitle;

      console.log("response: ", res);
    })

    .catch(err => {
      console.log(err);
      res.redirect("/error");
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
