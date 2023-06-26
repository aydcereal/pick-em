import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"
import { Nav } from "react-bootstrap"

export default function Root() {
    return <>
        <Navbar />
        <Outlet/>
    </>
}