import React from 'react'
import { Box, Container, Grid } from '@mui/material'

import styles from './styles.module.scss'
import ButtonCTA from 'shared/ui/ButtonCTA'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();

    const registerClick = () => {
        navigate('/auth');
    }

    return (
        <Box className={styles.navbar}>
            <Container>
                <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                    <span className={styles.logo}>Ralette</span>
                    <Grid container item xs={8} display='flex' justifyContent='flex-end' columnSpacing={6}>
                        <Grid item><Link to='/'>Home</Link></Grid>
                        <Grid item><Link to='/news'>News</Link></Grid>
                        <Grid item><Link to='/how-it-works'>How it works</Link></Grid>
                        <Grid item><Link to='/about-us'>About Us</Link></Grid>
                    </Grid>
                    <ButtonCTA onClick={registerClick}>Register</ButtonCTA>
                </Grid>
            </Container>
        </Box>
    )
}

export default Navbar