import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={require("./logo-sm.png")} alt=""/> 
        <p>
          UtiliSource Coding Test
        </p>
        <p style={{"margin": "20px 40px", "fontSize": "smaller"}}>
          Click each button and check console log to verify api can be reached.
        </p>
        <button onClick={getLinks}>Can Get Links</button>
        <button onClick={getLinkDetail}>Can Get Link Detail</button>
      </header>
    </div>
  );
}

function getLinks() {
  console.log("getLinks called");
  // Call will typically take 5 to 10 seconds to complete. Allow up to a 
  // minute to start up if first call in a while.
  apiGetChannelLinks().then((response) => {
    console.log(`Success. Retrieved ${response.Channels.length} channel and ${response.Links.length} video links`);
  })
  .catch((err) => {
    console.error(err);
  })
}


function getLinkDetail() {
  console.log("getLinkDetail called");
  // Hardcoded video link id, known to exist, for validation purposes only
  var linkId = "62e59bc354f7a3bac5c47b9e";
  apiGetLinkDetail(linkId).then((response) => {
    console.log(`Success. Retrieved link detail for linkId=${linkId}, title: ${response.Title}`);
  })
  .catch((err) => {
    console.error(err);
  })
}

async function apiGetChannelLinks() {
  return (
      axios.get(`${apiBaseUrl()}/links`, authHdr())
      .then(function (response) {        
        return response.data;
      })
      .catch(function (error) {
        console.error("-- " + error);
        return null;
      })
  );    
}

async function apiGetLinkDetail(linkId) {
  return (
      axios.get(`${apiBaseUrl()}/link/${linkId}`, authHdr())
      .then(function (response) {        
        return response.data;
      })
      .catch(function (error) {
        console.error("-- " + error);
        return null;
      })
  );    
}

function authHdr() {
  const key = "your_access_token_here";  // example: key = "373cn7cd89dddkd";
  const config = {
      headers: {
          "Authorization": `Key ${key}`,
      }
  };
  return config;
}

function apiBaseUrl() {
  return "api_base_url_goes_here";  // example: https://something.com/api   --Do not include a trailing slash "/"
}

export default App;
