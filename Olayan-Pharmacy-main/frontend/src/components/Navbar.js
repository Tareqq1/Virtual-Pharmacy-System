import { useLocation, Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'


const Navbar = () => {

  const location = useLocation()

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }


  return (
    
    <div className='navbar'>
      {location.pathname !== "/" && location.pathname !== "/Register"?
      <div className="container">
        
          <h1>Olyan Pharmacy</h1>
        <nav>
          <div>
            {user?<span>{user.user.username}</span>:null}
            <Link to="/"><button onClick={handleClick}>Log out</button></Link>
          </div>
        </nav>
      </div>:null}
    </div>
  )

}

export default Navbar