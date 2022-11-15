import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <a>
            <h1>
              <Image src='/../public/images/baskala-logo.png' width={250} height={82}/>
            </h1>
          </a>
        </Link>
      </header>

      <div className="page-content">
        { children }
      </div>

      <footer>
        <p>Copyright 2022 Baskala</p>
      </footer>
    </div>
  )
}