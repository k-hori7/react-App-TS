import style from "./Header.module.css";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className={style.header}>
      <Link to={`/`}>Blog</Link>
      <Link to={`/contact`}>お問い合わせ</Link>
    </header>
  );
}
