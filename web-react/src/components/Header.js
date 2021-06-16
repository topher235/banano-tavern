import { makeStyles, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import { Navbar, Nav, Container } from 'react-bootstrap';

import '../stylesheets/Header.css'


const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#422d26"
  },
  logo: {
    color: '#FFF388',
    fontWeight: 'bold'
  },
  menuButton: {
    color: '#FFF388',
    textAlign: 'center',
  },
  dropdownButton: {
    color: "#FFF388",
    textAlign: 'center',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row'
  }
}));

const headersData = [
  {
    label: 'Over/Under',
    href: '/game/overunder'
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Profile',
    href: '/profile'
  },
  {
    label: 'Faucet',
    href: '/faucet',
  },
  {
    label: 'Login',
    href: '/login',
  },
]


const getMenuButtons = (menuButtonStyle, user) => {
  return headersData.map(({ label, href }) => {
    if(label ==='Login' && user) {
      label = 'Logout';
      href = '/logout';
    }
      return (
        <Nav.Link
          href={href}
        >
          <Typography variant="h6" className={menuButtonStyle}>{label}</Typography>
        </Nav.Link>
      )
  });
};


const Header = () => {
  const { header, logo, menuButton, toolbar } = useStyles();
  const { user, setUser } = useContext(UserContext);
  const balance = user != null ? user.balance : 0;

  return (
    <>
      <Navbar collapseOnSelect fixed='top' sticky='top' expand={false} variant='dark' className={header}>
        <Container>
          <Navbar.Brand href='/about'>
            <Typography variant="h2" className={logo}>BananoTavern</Typography>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className="justify-content-end" style={{ width: '100%' }}>
              {getMenuButtons(menuButton, user)}
              <Typography variant="h6" className={menuButton}>Balance: {balance} bananos</Typography>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;
