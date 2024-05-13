// Import React and necessary hooks
import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  // State variables using useState hook
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null); // Ref for password input using useRef hook

  // Password generation function using useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }

    if (charAllowed) {
      str += "~!@#$%^&*()-_=+[{]}|;:,<.>/?'";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Copy password to clipboard function using useCallback hook
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, 50); // Assuming 50 is the maximum length
      window.navigator.clipboard.writeText(password);
    }
  }, [password, passwordRef]);

  // Effect hook to generate password on initial mount and state changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 bg-orange-500 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center text-black text-bold font-bold mb-6 ">
            Password Generator
          </h1>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={password}
              className="w-full py-3 px-4 border rounded-md focus:outline-none focus:border-orange-700 bg-gray-100"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipboard}
              className="ml-4 px-6 py-3 bg-black text-white text-bold rounded-md hover:bg-gray-800 focus:outline-none font-bold"
            >
              Copy
            </button>
          </div>

          <div className="flex items-center mb-6">
            <label
              htmlFor="length"
              className="mr-4 font-medium text-black text-bold"
            >
              Length:
            </label>
            <input
              type="range"
              id="length"
              min={4}
              max={50}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="flex-grow cursor-pointer appearance-none bg-gray-300 h-1 rounded-md"
            />
            <span className="ml-4 text-black text-bold font-bold">
              {length}
            </span>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="numberInput"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="mr-2 cursor-pointer"
            />
            <label
              htmlFor="numberInput"
              className="font-medium cursor-pointer text-black text-bold"
            >
              Include Numbers
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="charInput"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="mr-2 cursor-pointer"
            />
            <label
              htmlFor="charInput"
              className="font-medium cursor-pointer text-black text-bold"
            >
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
