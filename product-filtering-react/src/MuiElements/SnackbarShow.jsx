import React, { useEffect, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

export default function SnackbarShow({ get, set }) {
  useEffect(() => {
    if (get.clicked) {
      handleClick(SlideTransition);
      set({ clicked: false, message: get.message });
    }
  }, [get.clicked]);

  const [generateSnackbar, setGenerateSnackbar] = useState({
    open: false,
    Transition: Slide,
  });

  const handleClick = (SlideTransition) => {
    setGenerateSnackbar({
      open: true,
      Transition: SlideTransition,
    });
  };

  const handleClose = () => {
    setGenerateSnackbar({
      ...generateSnackbar,
      open: false,
    });
  };

  const renderSnackbar = (state) => {
    return (
      <Snackbar
        open={state.open}
        onClose={handleClose}
        TransitionComponent={state.Transition}
        message={get.message}
        key={get.message}
        autoHideDuration={1500}
      />
    );
  };

  return <>{renderSnackbar(generateSnackbar)}</>;
}
