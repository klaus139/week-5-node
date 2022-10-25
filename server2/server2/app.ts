import axios from "axios";
let cheerio = require("cheerio")
// import cheerio from "cheerio"
import http, { IncomingMessage, Server, ServerResponse } from "http";
/*
implement your server code here
*/
const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST" ) {
      let body = "";
                  req.on("data", (chunk) => {
                    body += chunk;
                  });
                  req.on("end", () => {
                    let url = body;
                    // console.log(data);
// const url = 'https://facebook.com'
async function getMeta() {
  try {
      interface Data {
        title?: string,
        description? : string,
        image_url?: string
      }
      const response = await axios.get(url);
      // console.log(response);
      const $ = cheerio.load(response.data);
      let obj: Data = {
        title: "",
        description: "",
        image_url: ""
      };
          obj['title'] = $("title").text();
          obj['description'] = $('meta[name="description"]').attr('content')
          obj['image_url'] = $('meta[property="og:image"]').attr('content')
          console.log(obj);
      res.end(JSON.stringify(obj, null, 2))
  } catch (error) {
      console.error(error);
  }
  } getMeta();
});
} else {
  res.writeHead(404, {'Content-Type': 'text/HTML'})
  .end(JSON.stringify({alert: "Route Unavailable"}))
}
  })
server.listen(3001, function (){
  console.log('Server is very much running at port 3001')
});