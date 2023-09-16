import { BarcodeFormat, ZXing } from "@zxing/library";
import React, { useEffect, useRef } from "react";

import { BrowserMultiFormatReader } from "@zxing/library";

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    // Bu, EAN-13 dahil farklı türlerdeki barkodları okuyabilir
    codeReader
      .listVideoInputDevices()
      .then((videoInputDevices) => {
        const sourceId =
          videoInputDevices.length > 0
            ? videoInputDevices[0].deviceId
            : undefined;

        // EAN-13 formatı için özel bir hint belirtebilirsiniz
        const hints = new Map();
        hints.set(BrowserMultiFormatReader.HINT_POSSIBLE_FORMATS, [
          BarcodeFormat.EAN_13,
        ]);

        codeReader
          .decodeFromInputVideoDevice(undefined, videoRef.current, hints)
          .then((result) => {
            console.log(`Barkod Okundu: ${result.text}`);
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
    </div>
  );
}

export default App;
