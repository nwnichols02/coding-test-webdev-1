import Moment from "react-moment";
import "./App.css";
import axios from "axios";

function Results({
  data,
  modalState,
  toggleModalState,
  selected,
  setSelected,
  apiBaseUrl,
  authHdr,
}) {
  const handleClick = (ID) => {
    axios
      .get(`${apiBaseUrl()}/link/${ID}`, authHdr())
      .then(function (response) {
        setSelected(response.data);
      })
      .catch((err) => console.err);

    toggleModalState();
  };

  return data.Links.sort((a, b) =>
    a.Publishedts > b.Publishedts ? 1 : -1
  ).map((data) => {
    return (
      <tr
        className="table-row"
        key={data.ID}
        onClick={() => handleClick(data.ID) && toggleModalState()}
      >
        {
          <div className={`modalBackground modalShowing-${modalState}`}>
            <div className="modalInner">
              <div className="modalText">
                <button onClick={toggleModalState}>X</button>
                <h2>{selected.Title}</h2>
                <p>{selected.SourceTimestamp}</p>
                <p>{selected.FullDescription}</p>
                <p>{selected.ThumbURL}</p>
                <p>{selected.Source}</p>
                <p>{selected.SourceChannelName}</p>
              </div>
            </div>
          </div>
        }
        <td className="table-data">
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
      </tr>
    );
  });
}

export default Results;
