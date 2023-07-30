import "../styles/Footer.css"

export default function Footer(){

    let currYear = new Date().getFullYear()

    return(
        <>
            <footer className="mainFooter">
                <div className="designer">AJIDEX &copy; Copyright reserved - {currYear-1} to {currYear} </div>
            </footer>
        </>
    )
}