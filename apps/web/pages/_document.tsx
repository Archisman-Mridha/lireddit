import { ReactElement } from "react"
import Document, { Html, Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class CustomDocument extends Document<{ styleTags: ReactElement[] }> {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet( )

        const page = renderPage((App) => (props) => sheet.collectStyles(<App {...props} />))

        const styleTags = sheet.getStyleElement( )

        return { ...page, styleTags }
    }

    render( ) {
        return (

            <Html>
                <Head>
                    { this.props.styleTags }
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>

        )
    }
}