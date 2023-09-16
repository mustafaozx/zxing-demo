import React, { useEffect, useRef, useState } from "react";

import { BrowserMultiFormatReader } from "@zxing/library";

function App() {
  const videoRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null); // Okunan kodu tutacak state

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceId =
          videoInputDevices.length > 0
            ? videoInputDevices[0].deviceId
            : undefined;

        codeReader
          .decodeFromInputVideoDevice(undefined, videoRef.current)
          .then((result) => {
            console.log(`Barkod Okundu: ${result.text}`);
            setScannedCode(result.text); // Okunan kodu güncelle
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));

    // Unmount işlemleri için
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div className="App">
      <h1>Barkod Okuyucu</h1>
      <video ref={videoRef} width={300} height={200}></video>
      {scannedCode && <p>Okunan Barkod: {scannedCode}</p>}{" "}
      {/* Eğer barkod okunduysa yazdır */}
    </div>
  );
}

export default App;
