import React, {useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import "./DialogLogin.scss"
// @ts-ignore
import {ReactComponent as CloseIcon} from "../../assets/img/close.svg"
import {PASSWORD, USERNAME} from "../../constants";
import {useActions} from "../../hooks/actions";
import {useNavigate} from 'react-router-dom';
import {Alert, AlertTitle, Snackbar} from "@mui/material";

interface IDialogLoginProps {
  openLogin: boolean,
  setOpenLogin: (isOpenLogin: boolean) => void,
  setOpenAlertSuccess: (isOpenAlertSuccess: boolean) => void,
}

const DialogLogin: React.FC<IDialogLoginProps> = ({openLogin, setOpenLogin, setOpenAlertSuccess}) => {
    const navigate = useNavigate()
    const {setUser} = useActions()
    const [newUser, setNewUser] = useState({name: "", password: ""})
    const [openAlertError, setOpenAlertError] = useState(false);

    const handleLogin = async () => {
      if (newUser.name === USERNAME && newUser.password === PASSWORD) {
        setOpenLogin(false);
        setUser(newUser)
        setOpenAlertSuccess(true);
        navigate('/profile')
      } else setOpenAlertError(true);
    }

    const handleCloseLogin = () => {
      setNewUser({...newUser, name: '', password: ''})
      setOpenLogin(false)
    }

    const handleCloseAlertError = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlertError(false);
    };

    return (
      <Dialog open={Boolean(openLogin)} onClose={() => handleCloseLogin()}>
        <DialogTitle>
          <div>Login</div>
          <div className='dialog__close' onClick={() => handleCloseLogin()}>
            <CloseIcon/>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to this website, please enter your name and password here.
          </DialogContentText>

          <div className='dialog__inputs'>
            <TextField
              label="Name"
              type="text"
              variant="standard"
              value={newUser.name}
              onChange={(event) => setNewUser({...newUser, name: event.target.value})}
            />

            <TextField
              label="Password"
              type="password"
              variant="standard"
              value={newUser.password}
              onChange={(event) => setNewUser({...newUser, password: event.target.value})}
            />
          </div>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => handleCloseLogin()}>Cancel</Button>
          <Button variant="outlined" onClick={handleLogin}
                  disabled={newUser.name === '' && newUser.password === ''}>Login</Button>
        </DialogActions>

        <Snackbar
          anchorOrigin={{vertical: "top", horizontal: "center"}}
          open={openAlertError} autoHideDuration={6000}
          onClose={handleCloseAlertError}
        >
          <Alert onClose={handleCloseAlertError} severity="error" sx={{width: '100%'}}>
            <AlertTitle>Error</AlertTitle>
            Username or password entered <strong>incorrectly!</strong>
          </Alert>
        </Snackbar>
      </Dialog>
    );
  }
;

export default DialogLogin;