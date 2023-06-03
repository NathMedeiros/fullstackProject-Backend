import app from "./app";

import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("database connected!");
    app.listen(3000, async () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
