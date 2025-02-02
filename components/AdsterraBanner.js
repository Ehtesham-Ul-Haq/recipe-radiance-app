import Script from "next/script";
import { useEffect } from "react";

const AdsterraBanner = () => {
  useEffect(() => {
    window.atOptions = {
      key: "865a5f6a6551822787590b50f0039e2c",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };
  }, []);

  return (
    <div>
      {/* Adsterra Ad Script */}
      <Script
        strategy="afterInteractive"
        src="//www.highperformanceformat.com/865a5f6a6551822787590b50f0039e2c/invoke.js"
      />
      
      {/* Ad Container */}
      <div id="container-865a5f6a6551822787590b50f0039e2c"></div>
    </div>
  );
};

export default AdsterraBanner;
