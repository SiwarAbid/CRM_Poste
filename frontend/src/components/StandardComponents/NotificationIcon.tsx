import React from 'react';
import { IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NotificationIcon() {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={4} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default NotificationIcon;
