import app from "./app";
import config from "./config/env.config";
import { initDB } from "./db";


const main = () =>{
  initDB();
  app.listen(config.port, () => {
  console.log(`This Server Run At PORT:${config.port}`);
});
}

main();