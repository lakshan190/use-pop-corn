import { useEffect, useRef, useState } from "react";

export function useKey(key, action) {
  //key stands for the keyboard key
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [key, action]
  );
}

//useEffect for enter press

// useEffect(
//     function () {
//       function callback(e) {
//         if (document.activeElement === inputEl.current) return;

//         if (e.code === "Enter") {
//           inputEl.current.focus();
//           //on enter press empty the search bar
//           setQuery("");
//         }
//       }
//       document.addEventListener("keydown", callback);

//       return () => document.removeEventListener("keydown", callback);
//     },
//     [setQuery]
//   );
