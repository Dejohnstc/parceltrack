"use client";

import Script from "next/script";

export default function TawkChat() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {};
          var Tawk_LoadStart = new Date();

          (function () {
            var s1 = document.createElement("script");
            var s0 = document.getElementsByTagName("script")[0];

            s1.async = true;
            s1.src = "https://embed.tawk.to/6abaaae14c69e23447f4d503/1k3kin0mq";
            s1.charset = "UTF-8";
            s1.setAttribute("crossorigin", "*");

            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
    />
  );
}