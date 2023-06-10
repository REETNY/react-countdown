import "../styles/Footer.css"

export default function Footer(){

    let currYear = new Date().getFullYear()

    return(
        <>
            <footer className="mainFooter">
                <div className="designer">AJIDEX &copy; Copyright reserved - 2022 to {currYear} </div>
            </footer>
        </>
    )
}