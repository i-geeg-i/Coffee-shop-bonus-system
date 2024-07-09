import Link from "next/link"
import AboutDiv from "../components/AboutDiv";

export default function About() {
    const text : Array<Array<string>> = [["Address", "Universitetskaya St, 1, Innopolis, Republic of Tatarstan, 420500"], ["Rating", ""], ["Active customers", "69"], ["Contact phone", "+7-000-000-00-00"], ["Contact email", "email@coffee.in"]];
    return( <div>
        <AboutDiv text={text} picSrc="/stand.jpg"/>
        </div>
    )
}