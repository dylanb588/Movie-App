import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from "@mui/icons-material/Menu";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

function Header() {
    const history = useHistory();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
    <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#/"
                    sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Movie Saga
                </Typography>
                <Button
                    onClick={() => {
                        history.push('/');
                        handleCloseNavMenu();
                    }}
                    sx={{ color: 'inherit', textTransform: 'uppercase', marginLeft: 'auto' }}
                >
                    Home
                </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Box>
        </Toolbar>
    </Container>
</AppBar>
    );
}

export default Header;