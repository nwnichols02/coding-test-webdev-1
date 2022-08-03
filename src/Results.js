import Moment from "react-moment";
import "./App.css";
import axios from "axios";
import { useState } from "react";
import PopUp from "./Popup";

let initialValues = {
  Title: "",
  SourceTimeStamp: "",
  FullDescription: "",
  ThumbURL: "",
  Source: "",
  SourceChannelUrl: "",
  SourceChannelName: "",
};

function Results({ data, apiBaseUrl, authHdr }) {
  const [modalState, setModalState] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleClick = (ID) => {
    axios
      .get(`${apiBaseUrl()}/link/${ID}`, authHdr())
      .then(function (response) {
        // console.log(response.data);
        setSelected(response.data);
      })
      .catch((err) => console.err);
    toggleModalState();
  };

  const toggleModalState = () => {
    setModalState(!modalState);
  };

  return data.Links.sort((a, b) =>
    a.Publishedts > b.Publishedts ? 1 : -1
  ).map((data) => {
    return (
      <tr
        className="table-row"
        key={data.ID}
        onClick={() => handleClick(data.ID)}
      >
        <td className="table-data" id="time">
          {<Moment unix>{data.Publishedts}</Moment>}
        </td>
        <td className="table-data">{data.Title}</td>
        <td className="table-data">{data.Source}</td>
        <td className="table-data">{data.SourceType}</td>
        <td className="table-data">
          <a href={data.URL} target="_blank" rel="noreferrer noopener">
            {data.URL}
          </a>
        </td>
        <PopUp
          modalState={modalState}
          selected={selected}
          toggleModalState={toggleModalState}
        />
      </tr>
    );
  });
}

export default Results;
