import { useEffect, useRef, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    //rather than using [watched,setWatched] better to give generic names so then this can be used in other projects
    //reading the values using the getITem method stored in localstorage and saving
    //it to the variable
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
    //react will call this function on intial render and it will use whatever value returned as the intial state from this returned value
    //this function also should be a pure function meaning it should not receive any arguments
    //rememebr to parse the json back to js object otherwise you will get an error saying watched.map is not a function
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
