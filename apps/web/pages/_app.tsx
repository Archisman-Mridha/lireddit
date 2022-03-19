import { AppProps } from "next/app"
import Head from "next/head"
import { Providers } from "../providers/providers"
import "../styles/global.styles.css"

function App({ Component, pageProps }: AppProps) {
    return (

        <>
            <Head>
                <title>Lireddit</title>
            </Head>
            <main className="app">
                <Providers>
                    <Component {...pageProps} />
                </Providers>
            </main>
        </>

    )
}

export default App