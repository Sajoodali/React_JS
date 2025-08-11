import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [lenth, Setlenth] = useState(8);
  const [numberAllowed, SetnumberAllowed] = useState(false);
  const [charAllowed, SetcharAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+[]{}|;:,.<>?";

    for (let i = 1; i <= lenth; i++) {
      let randomNumber = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(randomNumber);
    }
    setpassword(pass);
  }, [lenth, numberAllowed, charAllowed, setpassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [lenth, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div
      className="w-full max-w-md mx-auto shadow-md
        rounded-lg p-7 my-8 text-orange-500 bg-gray-800 "
    >
      <h1 className="text-white text-center text-3xl m-2">
        Password Genretor{" "}
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          placeholder="Password"
          readOnly
          value={password}
          ref={passwordRef}
          className="w-full outline-none py-1 px-3 bg-white font-semibold"
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-amber-500 text-white px-3 py-1 shrink-0"
        >
          Copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1 ">
          <input
            type="range"
            min={8}
            max={100}
            value={lenth}
            className="cursor-pointer"
            onChange={(e) => {
              Setlenth(e.target.value);
            }}
          />
          <label> Length:{lenth}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={(e) => {
              SetnumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={(e) => {
              SetcharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Charector</label>
        </div>
      </div>
    </div>
  );
}

export default App;
