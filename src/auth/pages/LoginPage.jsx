import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink} from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth'

import { AuthLayout } from '../layout/AuthLayout'

import { useForm } from '../../hooks'

const initialState = {
  email: '',
  password: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe de tener una @'],
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state=> state.auth);
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, password, onInputChange, formState, isFormValid, emailValid } = useForm(initialState, formValidations);

  const isAuthenticating = useMemo( () => status === 'checking', [status]);

  const onSubmit = ( event ) => {
    event.preventDefault();
    //console.log({email, password})
    if(!isFormValid) return;
    setFormSubmitted(true);
    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() )
  }

  
  return (
    <AuthLayout title ="Login">
      <form 
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2} }>
              <TextField 
                label="Correo" 
                type="email"
                placeholder="correo@email.com"
                fullWidth
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2} }>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={ onInputChange }
              />
            </Grid>
            <Grid 
              item
              xs={12} 
              sx={{ mt: 2} }
              display={ !!errorMessage ? '' : 'none'}
            >
              <Alert
                severity='error'
              >
                { errorMessage }
              </Alert>
            </Grid>
            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} sm={6}>
                <Button 
                  type="submit" 
                  variant="contained"  
                  fullWidth
                  disabled = { isAuthenticating }
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                  variant="contained" 
                  fullWidth
                  onClick={ onGoogleSignIn }
                  disabled = { isAuthenticating }
                  >
                  <Google/>
                  <Typography sx={{ml: 1}}>
                    Google
                  </Typography>
                </Button>
              </Grid>
            </Grid>
            
            <Grid container direction="row" justifyContent="end">
              <Link component={ RouterLink } color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
        
  )
}
