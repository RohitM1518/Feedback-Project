import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

export default function FeedbackFormButton({mainBtn="",btn1="",btn2="",btn3="",link1="",link2="",link3="",variant=""}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant={variant}
      >
        {mainBtn}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link to={`/${link1}`}> 
        <MenuItem onClick={handleClose}>{btn1}</MenuItem>
        </Link>
        <Link to={`/${link2}`}>
        <MenuItem onClick={handleClose}>{btn2}</MenuItem>
        </Link>
        <Link to={`/${link3}`}>
        <MenuItem onClick={handleClose}>{btn3}</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
