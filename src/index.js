import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import StarRating from "./StarRating";

function TestComponent() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="green" maxRating={8} onSetRating={setMovieRating} />
      {movieRating ? (
        <p>Hello all this movie was rated {movieRating} Stars</p>
      ) : (
        ""
      )}
    </div>
  );
}

//dont give maxRating 0 then the Array.from wont generate the item length to show the stars

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

{
  /* <StarRating
maxRating={5}
messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
defaultRating={3}
/>
<StarRating maxRating={6} size={32} color="red" className="test" />
<TestComponent /> */
}
