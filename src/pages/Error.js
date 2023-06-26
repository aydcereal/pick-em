import Navbar from "../components/navbar"

export default function ErrorPage() {
    return <>
        <Navbar />

        <div className="pageTitle">
        <h1>Page not found (404)</h1>
        <p>Flag on the play! The requested football content has been penalized with a 404 error. 
            It seems to have gone out of bounds.
            
        </p>

        </div>
        
    </>
}