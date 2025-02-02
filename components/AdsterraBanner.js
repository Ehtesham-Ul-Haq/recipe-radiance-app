import Script from "next/script";

const AdsterraBanner = () => {
  return (
    <div>
      {/* Adsterra Script */}
      <Script
        strategy="afterInteractive"
        async
        data-cfasync="false"
        src="//pl25751472.profitablecpmrate.com/9a38ae1832e7604b7eb41854d8c92c8e/invoke.js"
      />
      
      {/* Ad Container */}
      <div id="container-9a38ae1832e7604b7eb41854d8c92c8e"></div>
    </div>
  );
};

export default AdsterraBanner;
