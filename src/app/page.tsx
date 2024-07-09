import About from "./info/page"
import Link from "next/link"
import NewsItemLeft from "./components/NewsItemLeft"
import NewsItemRight from "./components/NewsItemRight"
import { title } from "process"

export default function Home() {
  return ( <div>
    <h1 className="main-title">Coffee in</h1>
    <NewsItemLeft title="Only today!" img="/news1.png" info="Buy one cup of espresso and get 50% more bonuses!" buttonInfo="Order now" link="./menu"/>
    <NewsItemRight title="SALE" img="/news2.png" info="-20% for raf." buttonInfo="Order now" link="./menu" />
    <NewsItemLeft title="Enjoy our bonus program" img="/news1.png" info="Get bonuses for each purchase! Create your account now."  buttonInfo="Sign up" link="./profile" />
    </div>
  )
}