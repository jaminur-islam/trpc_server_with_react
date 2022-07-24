import express from "express";
import * as trpc from "@trpc/server"
import * as trpcExpress from "@trpc/server/adapters/express"
import { string } from "zod";
const cors = require("cors")
import {z} from "zod";



interface ChatMessage  {
  user: string;
  message: string
}
//======================== interface extent ===========================//
/* interface ChatMessage2 extends ChatMessage  {
  
}
 */
const message : ChatMessage[] = [
  {user: "user1" , message: "hello"},
  {user: "user2" , message: "hi"}
]


const appRouter = 
trpc.router()
.query("hello" ,{
  resolve(){
    return "hi sagorerferfewrtfewdfdef"
  }
})
.query("getMessage", {
  input: z.number().default(10),
  resolve({input}){
    return message.slice(-input)
  }
})

 export type AppRouter = typeof appRouter;


const app = express();
const port = 8080;
app.use(cors())

app.use("/trpc" , trpcExpress.createExpressMiddleware({
  router: appRouter,
  createContext: ()=> null,
}))





app.get("/", (req, res) => {
  res.send("Hello from 8080");
});

app.listen(port, () => {
  console.log(`8080 listening at http://localhost:${port}`);
});
