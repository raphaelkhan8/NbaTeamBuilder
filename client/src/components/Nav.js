import { BrowserRouter, Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div>
            <BrowserRouter>
                <Link to='/pointGuards' style={{ marginRight: 20 }}>
                    Point Guards
                </Link>
                <Link to='/shootingGuards' style={{ marginRight: 20 }}>
                    Shooting Guards
                </Link>
                <Link to='/smallForwards' style={{ marginRight: 20 }}>
                    Small Forwards
                </Link>
                <Link to='/powerForwards' style={{ marginRight: 20 }}>
                    Power Forwards
                </Link>
                <Link to='/centers' style={{ marginRight: 20 }}>
                    Centers
                </Link>
            </BrowserRouter>
        </div>
    )
}

export default Nav