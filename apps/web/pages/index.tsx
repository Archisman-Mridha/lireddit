import { NextPage } from "next"
import { Navbar } from "../components/navbar.component"
import { Protected } from "../components/protected.component"

const Home: NextPage= ( ) => {
    return (

        <>
            <Protected>
                <Navbar />
            </Protected>
        </>

    )
}

export default Home