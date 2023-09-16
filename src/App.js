import React, { useEffect, useRef, useState } from "react";

import { BrowserMultiFormatReader } from "@zxing/library";

function App() {
  const videoRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);
  const codeReader = new BrowserMultiFormatReader();

  const readCode = () => {
    codeReader
      .decodeFromInputVideoDevice(undefined, videoRef.current)
      .then((result) => {
        console.log(`Barkod Okundu: ${result.text}`);
        setScannedCode(result.text);
        codeReader.reset();
        setTimeout(readCode, 1000); // 1 saniye bekleyip tekrar okuma işlemi başlatır
      })
      .catch((err) => {
        console.error(err);
        setTimeout(readCode, 1000); // 1 saniye bekleyip tekrar okuma işlemi başlatır
      });
  };

  useEffect(() => {
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceId =
          videoInputDevices.length > 0
            ? videoInputDevices[0].deviceId
            : undefined;
        readCode();
      })
      .catch((err) => console.error(err));

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="App">
      <h1>Barkod Okuyucu</h1>
      <video ref={videoRef} width={300} height={200}></video>
      {scannedCode && <p>Okunan Barkod: {scannedCode}</p>}
    </div>
  );
}

export default App;
