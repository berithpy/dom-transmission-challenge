# streamdom-challenge
To run the project locally, you will need to have [Node.js](https://nodejs.org/en/) installed on your machine.
 Once you have Node.js installed, you can run the following commands in the root directory to get started:
```
cd server
npm install
node ioserver.js
```
And in a separate terminal window:
```
cd client
npm install
npm start
```
Once both the server and client are running there are a couple of routes to access
- http://localhost:3000/ - This is the main page where you can play tetris and where rrweb will stream
- http://localhost:3000/management - This is the management page where you can see the list of active sessions and click on a session to watch it
- http://localhost:3000/management/live/:id - And the live pages where based on the session id you can join and watch the live session



https://user-images.githubusercontent.com/8316977/220126908-149680d6-dbe6-471f-8782-afd53dcbc708.mp4



### Required Functionality

- [x] The product manager should be able to see the **list of all currently active sessions** (just showing session id’s is fine)
- [x] The product manager should be able to **watch any active session in real-time**
- [x] Since this is realtime streaming, latency is important! Consider using websockets

      Latency of event E = Time E observed by PM - Time of E in user session
- [x] **(Bonus)** Measure the latency and display it for the product manager to see while watching sessions. For example, display ‘X ms delayed’ while PM is watching the session
