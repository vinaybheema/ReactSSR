import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";
import renderReact from "./helpers/renderReact";
import createStore from "./helpers/createStore";
import Routes from "./client/Routes";
import { resolve } from "url";

const app = express();

// app.use('/api', proxy('http://react-ssr-api.herokuapp.com'));
app.use(
  "/api",
  // proxy("https://react-ssr-api.herokuapp.com", {
  //   proxyReqPathResolver: opts => "localhost:3000"
  // })
  proxy("https://react-ssr-api.herokuapp.com", {
    proxyReqOptDecorator: opts => {
      opts.headers["x-forwarded-host"] = "localhost:3000";
      return opts;
    }
  })
);

app.use(express.static("public"));

app.get("*", (req, res) => {
  const store = createStore(req);

  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises)
    .then(() => {
      const context = {};
      const content = renderReact(req, store, context);
      if (context.url) {
        res.redirect(301, context.url);
      }
      if (context.notFound) {
        res.status(404);
      }

      res.send(content);
      // res.send(renderReact(req, store, context));
    })
    .catch(error => {
      res.send("SOmething went wrong");
    });
});

app.listen("3000", () => {
  console.log("Listening on 3000 port");
});
