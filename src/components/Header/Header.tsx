import React, {useState} from 'react';
import './Header.scss'
import {NavLink} from "react-router-dom";
import {Alert, AlertTitle, MenuItem, Snackbar} from "@mui/material";
import DialogLogin from "../DialogLogin/DialogLogin";
import {useActions} from "../../hooks/actions";
import {useAppSelector} from "../../hooks/redux";
import {useTranslation} from "react-i18next";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  const [openLogin, setOpenLogin] = useState(false)
  const {logoutUser} = useActions()
  const user = useAppSelector((state) => state.data.user);
  const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
  const [openAlertLogout, setOpenAlertLogout] = useState(false);
  const [t, i18n] = useTranslation('text');
  const [checkedLanguage, setCheckedLanguage] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    setOpenAlertLogout(true)
    logoutUser({})
    setAnchorElUser(null)
  };

  const handleChangeLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedLanguage(event.target.checked);
    checkedLanguage ? i18n.changeLanguage('uk') : i18n.changeLanguage('en')
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlertSuccess(false);
    setOpenAlertLogout(false);
  };

  return (
    <header className='header'>

      <AppBar position="static" className='appBar container'>
        <Toolbar disableGutters>

          <NavLink to='/'>
            <Button>
              {t('Menu.home')}
            </Button>
          </NavLink>

          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <NavLink to='/news'>
              <Button>
                {t('Menu.news')}
              </Button>
            </NavLink>

            {!user?.name && (
              <Button onClick={() => setOpenLogin(true)}>
                {t('Menu.login')}
              </Button>
            )}

            <FormControlLabel
              control={<Switch size='medium' checked={checkedLanguage} onChange={handleChangeLanguage}/>}
              label="UK  EN"
            />
          </Box>

          {user?.name && (
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={(event) => setAnchorElUser(event.currentTarget)} sx={{p: 0}}>
                  <Avatar alt={user?.name}>{user?.name[0].toUpperCase()}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >

                <MenuItem onClick={() => setAnchorElUser(null)}>
                  <NavLink to='/profile'>
                    <Typography textAlign="center">{t('Menu.profile')}</Typography>
                  </NavLink>
                </MenuItem>

                <MenuItem onClick={(event) => handleLogout(event)}>
                  <Typography textAlign="center">{t('Menu.logout')}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <DialogLogin
        openLogin={openLogin}
        setOpenLogin={setOpenLogin}
        setOpenAlertSuccess={setOpenAlertSuccess}
      />

      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={openAlertSuccess}
        autoHideDuration={6000}
        onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
          <AlertTitle>Success login</AlertTitle>
          Username and password entered <strong>correctly!</strong>
        </Alert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{vertical: "top", horizontal: "center"}}
        open={openAlertLogout}
        autoHideDuration={6000}
        onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{width: '100%'}}>
          <AlertTitle>Success logout</AlertTitle>
          User is <strong>logout!</strong>
        </Alert>
      </Snackbar>
    </header>
  );
};

export default Header;