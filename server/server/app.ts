import http, { IncomingMessage, Server, ServerResponse } from "http";
//import { Task } from "./ITasks";
import { addTask, getTasks, updateTask, deleteTask } from "./controller";

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    //get tasks
    if(req.method == "GET" && req.url == "/api/tasks"){
      return getTasks(req,res);
    }
    //creating a task
    if(req.method == "POST" && req.url == "/api/tasks"){
      return addTask(req,res);
    }
    //updating a task
    if(req.method == "PUT" && req.url == "/api/tasks"){
      return updateTask(req,res);
    }
    //deleting a task
    if(req.method == "DELETE" && req.url == "/api/tasks"){
      return deleteTask(req,res);
    }
    //default response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
