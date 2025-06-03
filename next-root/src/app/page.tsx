"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Carrega SystemJS
      const systemScript = document.createElement("script");
      systemScript.src = "https://cdn.jsdelivr.net/npm/systemjs@6.14.2/dist/system.min.js";
      systemScript.async = false;
      document.body.appendChild(systemScript);

      // Carrega o importmap
      const importMapScript = document.createElement("script");
      importMapScript.type = "systemjs-importmap";
      fetch("/importmap.json")
        .then(res => res.json())
        .then(map => {
          importMapScript.textContent = JSON.stringify(map);
          document.body.appendChild(importMapScript);

          // Só depois de SystemJS e importmap, carrega o single-spa-config.js
          const spaScript = document.createElement("script");
          spaScript.src = "/single-spa-config.js";
          spaScript.async = true;
          document.body.appendChild(spaScript);
        });

      return () => {
        document.body.removeChild(systemScript);
        if (importMapScript.parentNode) document.body.removeChild(importMapScript);
        // spaScript será removido automaticamente ao recarregar a página
      };
    }
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "20px 1fr 20px",
        alignItems: "center",
        justifyItems: "center",
        minHeight: "100vh",
        padding: "2rem",
        paddingBottom: "5rem",
        gap: "4rem",
        fontFamily: "var(--font-geist-sans), sans-serif",
        background: "#fff",
        color: "#222",
      }}
    >
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          gridRowStart: 2,
          alignItems: "center",
        }}
      >
        <Image
          style={{ filter: "invert(0%)" }}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {/* Aqui será montado o microfrontend React pelo single-spa */}s
        <div
          id="single-spa-application:mfe-react"
          style={{
            minHeight: 300,
            minWidth: 300,
            border: "1px solid #ccc",
            margin: 16,
          }}
        />
        <ol
          style={{
            listStyle: "decimal inside",
            fontSize: "0.95rem",
            textAlign: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            margin: 0,
            padding: 0,
          }}
        >
          <li style={{ marginBottom: "0.5rem", letterSpacing: "-0.01em" }}>
            Get started by editing{" "}
            <code
              style={{
                background: "#f2f2f2",
                padding: "2px 6px",
                borderRadius: "4px",
                fontFamily: "var(--font-geist-mono), monospace",
                fontWeight: 600,
              }}
            >
              src/app/page.tsx
            </code>
            .
          </li>
          <li style={{ letterSpacing: "-0.01em" }}>
            Save and see your changes instantly.
          </li>
        </ol>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <a
            style={{
              borderRadius: "9999px",
              border: "1px solid transparent",
              transition: "background 0.2s, color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#222",
              color: "#fff",
              gap: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
              height: "2.5rem",
              padding: "0 1.25rem",
              textDecoration: "none",
            }}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            onMouseOver={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#383838";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#222";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
          >
            <Image
              style={{ filter: "invert(0%)" }}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            style={{
              borderRadius: "9999px",
              border: "1px solid #ddd",
              transition: "background 0.2s, border 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              color: "#222",
              gap: "0.5rem",
              fontWeight: 500,
              fontSize: "1rem",
              height: "2.5rem",
              padding: "0 1.25rem",
              textDecoration: "none",
              width: "100%",
              maxWidth: "158px",
            }}
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            onMouseOver={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#f2f2f2";
              (e.currentTarget as HTMLAnchorElement).style.border = "1px solid transparent";
            }}
            onMouseOut={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#fff";
              (e.currentTarget as HTMLAnchorElement).style.border = "1px solid #ddd";
            }}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer
        style={{
          gridRowStart: 3,
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
            (e.currentTarget as HTMLAnchorElement).style.textUnderlineOffset = "4px";
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
          }}
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
            (e.currentTarget as HTMLAnchorElement).style.textUnderlineOffset = "4px";
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
          }}
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            textDecoration: "none",
          }}
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
          onMouseOver={e => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
            (e.currentTarget as HTMLAnchorElement).style.textUnderlineOffset = "4px";
          }}
          onMouseOut={e => {
            (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
          }}
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
