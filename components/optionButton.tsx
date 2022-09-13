// MUI and MUI Icons
import { Button } from '@mui/material';

// React
import React from 'react';

interface OptionButtonProps {
  className: string,
  select: Function,
  icon: any
}

const OptionButton = (props: React.PropsWithChildren<OptionButtonProps>) => {
  const { className, select, icon } = props;

  return (
    <Button className={className} variant="contained" onClick={() => select()}>
      {icon}
    </Button>
  );
}

export default OptionButton;