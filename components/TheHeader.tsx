import Link from "next/link";

const TheHeader = () => {
    return (
        <header className="header">
            <Link className="nav" href="/about">About </Link>
            <Link className="nav" href="/menu">Menu </Link>
            <Link className="nav" href="/">Home</Link>
        </header>
    )
}

export {TheHeader};