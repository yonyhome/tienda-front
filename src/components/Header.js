import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Tienda
      </Typography>
      <Button color="inherit" component={Link} to="/cart">Carrito</Button>
    </Toolbar>
  </AppBar>
);

export default Header;
