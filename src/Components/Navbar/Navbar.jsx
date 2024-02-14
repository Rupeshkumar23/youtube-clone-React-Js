import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import profile_icon from '../../assets/jack.png'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Navbar = ({setSidebar}) => {
  return (
    <>
    <nav className='flex_div'>
        <div className='nav_left flex_div'>
            <img className='menu_icon' onClick={()=>setSidebar(prev=>prev===false?true:false)} src={menu_icon} alt='menuIcon'/>
        <Link to="/"> <img className='logo'src={logo} alt='logo'/></Link>  
        </div>
        <div className='nav_middle flex_div'>
          <div className='search_box flex_div'>
            <input type="text" placeholder='Search' />
            <img src={search_icon} alt="search" />
            </div>
        </div>
        <div className='nav_right flex_div'>
            <img src={upload_icon} alt="" />
            <img src={more_icon} alt="" />
            <img src={notification_icon} alt="" />
            <img src={profile_icon} className='user_icon' alt="" />
        </div>
    </nav>
   
    </>
  )
}

export default Navbar