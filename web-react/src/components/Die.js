import '../stylesheets/Die.css';

const Die = (props) => {
  console.log(props);
  return (
    <div>
      <ol className="die-list even-roll" data-roll={props.value} id="die-1">
        <li className="die-item" data-side="1">
          <span className="dot"></span>
        </li>
        <li className="die-item" data-side="2">
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li className="die-item" data-side="3">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li className="die-item" data-side="4">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li className="die-item" data-side="5">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
        <li className="die-item" data-side="6">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </li>
      </ol>
      
    </div>
  )
}

export default Die;
