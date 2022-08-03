import "./App.css";
import Moment from "react-moment";

function Popup({ closePopUp, data }) {
  return (
    <div className="modal-background">
      MODAL HERE!
      <div className="modal-container"></div>
      <button onClick={() => closePopUp()}>X</button>
      <div className="modal-title"><h1>{data.Title}</h1></div>
      <div className="modal-body">
        <p>{<Moment unix>{data.Publishedts}</Moment>}</p>
        <p>{data.Source}</p>
      </div>
      <div className="modal-footer"></div>
    </div>
  );
}

export default Popup;
