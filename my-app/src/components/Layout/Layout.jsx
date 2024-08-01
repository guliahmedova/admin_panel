import { Router, Sidebar, TopNav } from '../index';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main__layout">
        <TopNav />

        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  )
}

export default Layout