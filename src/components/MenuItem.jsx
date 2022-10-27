import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import { url } from "../utils";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export default function AccountMenu({ name, role }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user_id = localStorage.getItem("user_id");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changePassword = async () => {
    try {
      const { data } = await axios.get(`${url}/changepassword/${user_id}`);
      console.log("Change password", data);
      data?.status == "ok" && toast.success(data?.message);
    } catch (error) {
      console.log("Change password !", error);
    }
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {name && (
            <Avatar sx={{ width: 32, height: 32 }}>
              {name.toUpperCase().slice(0, 1)}
            </Avatar>
          )}
          <Typography
            ml={2}
            variant="body1"
            sx={{
              textDecoration: "none",
              cursor: "pointer",
              color: "text.main",
            }}
          >
            {name ? name : null}
          </Typography>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Divider />
        {role === "admin" && (
          <MenuItem>
            <Link
              to="/admin"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Admin
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link
            to={`/profile/${user_id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <Link to="/logout" style={{ textDecoration: "none", color: "black" }}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            changePassword();
          }}
        >
          <Link
            to="#"
            style={{
              textDecoration: "none",
              color: "black",
              fontSize: "14px",
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Change password
          </Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
