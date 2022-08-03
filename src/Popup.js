import Moment from "react-moment";

function Popup({ modalState, toggleModalState, selected }) {
  return (
    <div className={`modalBackground modalShowing-${modalState}`}>
      <div className="modalInner">
        <span>
          <button onClick={() => toggleModalState()}>X</button>
        </span>
        <div className="modalText">
          <h2>{selected.Title}</h2>
          <p className="modalTimestamp">
            {<Moment>{selected.SourceTimeStamp}</Moment>}
            {selected.Source}
          </p>
          <a
            href={selected.SourceChannelUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <span>{selected.SourceChannelName}</span>
          </a>
          <p className="modal">{selected.FullDescription}</p>
          <img src={selected.ThumbURL} alt="Video Thumbnail" />
        </div>
      </div>
    </div>
  );
}

export default Popup;
