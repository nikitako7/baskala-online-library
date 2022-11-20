import { Header } from './Header/Header';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Header />

      <div>
        { children }
      </div>

      <footer>
        <p>Copyright 2022 Baskala</p>
      </footer>
    </div>
  )
}