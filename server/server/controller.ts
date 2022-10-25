import fs from 'fs';
import path from 'path';

//handle request and response
import { ServerResponse, IncomingMessage } from 'http';

import { Task } from './ITasks';

const getTasks = (req: IncomingMessage, res: ServerResponse) => {
    return fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error reading file' }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: JSON.parse(data) }));
        }
    }
    );
}

const addTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
        console.log(data);
    });
    req.on('end', () => {
        let task = JSON.parse(data);
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error reading file' }));
            } else {
                let tasks: Task[] = JSON.parse(data);
                //add the new task
                tasks.push(task);
                
                    //write the new array to the file
                    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(tasks), (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ message: 'Error writing file' }));
                        } else {
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ success: true, message: 'Task added successfully' }));
                        }
                    }
                );

            }

        }
        );
    }
    );
}

const updateTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk.toString();
    });
    req.on('end', () => {
        let task: Task = JSON.parse(data);
        fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Error reading file' }));
            } else {
                let tasks: Task[] = JSON.parse(data);
                //find the index of the task to update
                let taskIndex = tasks.findIndex((t: Task) => t.id === task.id);
                //update the task
                tasks[taskIndex] = task;
                //write the new array to the file
                fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Error writing file', error: err }));
                    } else {
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true, message: 'Task updated successfully', task }));
                    }
                }
                );

            }

        }
        );
    }
    );
}

//delete a task
const deleteTask = (req: IncomingMessage, res: ServerResponse) => {
    let data = "";
    req.on("data", (chunk) => {
        data += chunk.toString();
    }
    );
    //when the request is done
    req.on("end", () => {
        let task: Task = JSON.parse(data);
        fs.readFile(path.join(__dirname, "data.json"), "utf-8", (err, data) => {
            if (err) {
                res.writeHead(500, {"Content-Type": "application/json"});
                res.end(JSON.stringify({message: "Error reading file", error: err}));
            } else {
                let tasks: [Task] = JSON.parse(data);
                //find the index of the task to delete
                let taskIndex = tasks.findIndex((t) => t.id == task.id);
                //delete the task
                tasks.splice(taskIndex, 1);
                //write the new array to the file
                fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(tasks), (err) => {
                    if (err) {
                        res.writeHead(500, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({message: "Error writing file", error: err}));
                    } else {
                        res.writeHead(200, {"Content-Type": "application/json"});
                        res.end(JSON.stringify({success: true, message: "Task deleted successfully"}));
                    }
                }
                );

            }
        }
        );
    })
}

export { getTasks, addTask, updateTask, deleteTask };
