import "../styles/global.css";

export default function App({ Component, pageProps }) {
  console.log(Component, "com");
  console.log(pageProps, "page");
  return <Component {...pageProps} />;
}
