/**
 * Primary file for the API
 */

 // Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

 //  the server should respond to all requests with a string
 const server = http.createServer(function(req, res) {

  //Get the URL and parse it
  const parsedUrl = url.parse(req.url, true);

  //Get the path of the URL
  const path = parsedUrl.pathname;  
  const trimmedPath = path.replace(/^\/+|\/+$/g, '')

  //get the query string as an object

  const queryStringObject = parsedUrl.query;

  
  //get the HTTP method
  const method = req.method.toLocaleLowerCase();

  // get the headesr as an object
  const headers = req.headers;

  //Get the payload/body, if any
  const decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', function(data) {
    //as the data streams in we append the data into the
    //buffer after decoding
    buffer += decoder.write(data);
  });

  req.on('end', function(){
    // end of the response
    buffer += decoder.end();

    // CHoose the hanlder this request should go to.
    // if one is not found , use the notFound handler
    let handler
    if (typeof(router[trimmedPath]) !== 'undefined' ) {      
      handler = router[trimmedPath];
    } else {
      handler = handlers.notFound;
    }
    
    const chosenHandler = handler;
    //Construct the data object to send to the handler

    const data = {
      'trimmedPath': trimmedPath,
      'queryStringObject': queryStringObject,
      'method': method,
      'headers': headers,
      'payload': buffer
    };

    //Route the request to the handler specified in the router
    chosenHandler(data, function(statusCode, payload) {
      // Use the status code called back by the handler
      // pr default to 200
      statusCode = typeof(statusCode) === 'number' ? statusCode : 200;

      //use the payload called back by the handler, or default to 
      // an empty object
      payload = typeof(payload) === 'object' ? payload : {};

      // Conert the payload to a string
      const payloadString = JSON.stringify(payload);

      //Return the response
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      // log
    console.log('Request this response : ', statusCode, payloadString);
    });

    
    
  });
  // Log what the request path
  // console.log('Request received on path: '+trimmedPath 
  // + ' with method: ' + method + ' with this query string parameters ' , queryStringObject);
  
  // console.log('Request received with this headers ', headers);
  
 });

 // start the server, and have it listen on port 3000
 server.listen(3000, function() {
   console.log('The server is listening on port 3000 now');
 })

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function(data, callback) {
  // Callback a http status code, and a payload object
  callback(406, {'name': 'sample handler'});
};

// Not found handler
handlers.notFound = function(data, callback) {
  callback(404);
}

 // Define a request rouer
 const router = {
   'sample': handlers.sample
 };
