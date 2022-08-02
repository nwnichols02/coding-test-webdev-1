import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${apiBaseUrl()}/links`, authHdr())
      .then(function (response) {
        setData(response.data);
      })
      .catch((err) => console.err);
  }, []);

  if (!data) {
    return <div>Loading information...</div>;
  }

  function compareNumbers(a, b) {
    return b - a;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={require("./logo-sm.png")} alt="" />
        <p>UtiliSource Coding Test</p>
        <p style={{ margin: "20px 40px", fontSize: "smaller" }}>
          Click each button and check console log to verify api can be reached.
        </p>
        <button onClick={getLinks}>Can Get Links</button>
        <button onClick={getLinkDetail}>Can Get Link Detail</button>
        <table className="video-table">
          <tr>
            <th>Published</th>
            <th>Title</th>
            <th>Source</th>
            <th>SourceType</th>
            <th>URL</th>
          </tr>
          {/* {console.log(data.Links[30])} */}
          {/* Working code minus sort by date */}
          {/* {data.Links.map((data) => {
              return (
                <tr>
                  <td>{<Moment unix>{data.Publishedts}</Moment>}</td>
                  <td>{data.Title}</td>
                  <td>{data.Source}</td>
                  <td>{data.SourceType}</td>
                  <td><a href={data.URL} target="_blank" rel="noreferrer noopener">{data.URL}</a></td> 
                </tr>
              )
            })} */}
          {
            data.Links
              .sort((a,b) => a.Publishedts > b.Publishedts ? 1 : -1)
              .map((data) => {
                return (
                  <tr className="table-row">
                    <td className="table-data">
                      {<Moment unix>{data.Publishedts}</Moment>}
                    </td>
                    <td className="table-data">{data.Title}</td>
                    <td className="table-data">{data.Source}</td>
                    <td className="table-data">{data.SourceType}</td>
                    <td className="table-data">
                      <a
                        href={data.URL}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {data.URL}
                      </a>
                    </td>
                  </tr>
                );
              })
            // return b.Publishedts - a.Publishedts;
          }
        </table>
      </header>
    </div>
  );
}

function getLinks() {
  console.log("getLinks called");
  // Call will typically take 5 to 10 seconds to complete. Allow up to a
  // minute to start up if first call in a while.
  apiGetChannelLinks()
    .then((response) => {
      console.log(
        `Success. Retrieved ${response.Channels.length} channel and ${response.Links.length} video links`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

function getLinkDetail() {
  console.log("getLinkDetail called");
  // Hardcoded video link id, known to exist, for validation purposes only
  var linkId = "62e59bc354f7a3bac5c47b9e";
  apiGetLinkDetail(linkId)
    .then((response) => {
      console.log(
        `Success. Retrieved link detail for linkId=${linkId}, title: ${response.Title}`
      );
    })
    .catch((err) => {
      console.error(err);
    });
}

async function apiGetChannelLinks() {
  return axios
    .get(`${apiBaseUrl()}/links`, authHdr())
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error("-- " + error);
      return null;
    });
}

async function apiGetLinkDetail(linkId) {
  return axios
    .get(`${apiBaseUrl()}/link/${linkId}`, authHdr())
    .then(function (response) {
      console.log(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.error("-- " + error);
      return null;
    });
}

function authHdr() {
  const key = "62d60811f8e28aca7e5d690a"; // example: key = "373cn7cd89dddkd";
  const config = {
    headers: {
      Authorization: `Key ${key}`,
    },
  };
  return config;
}

function apiBaseUrl() {
  return "https://utilicodingtest2.azurewebsites.net/api"; // example: https://something.com/api   --Do not include a trailing slash "/"
}

export default App;
