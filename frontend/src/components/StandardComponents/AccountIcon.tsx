// AccountIcon.tsx
import React from 'react';
import { IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AccountIcon() {
  return (
    <IconButton color="inherit">
      <Avatar>
        <AccountCircleIcon />
      </Avatar>
    </IconButton>
  );
}

export default AccountIcon;
