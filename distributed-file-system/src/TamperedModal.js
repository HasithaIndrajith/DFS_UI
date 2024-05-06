import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

export default function TamperedModal({ open, handleClose }) {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={() => handleClose(false)}>
        <DialogTitle
          id="alert-dialog-title"
          style={{
            backgroundColor: "black",
            color: "white",
            borderColor: "blue",
          }}
        >
          Tampered Content Warning!
        </DialogTitle>
        <Divider />
        <DialogContent style={{ backgroundColor: "black", color: "white" }}>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "white" }}
          >
            Content of the file you are trying to download has been tampered
            with. Scatterrr does not guarantee the authenticity and integrity of
            the file. Do you still want to proceed with the download?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "black", color: "white" }}>
          <Button onClick={() => handleClose(false)} color="primary">
            Close
          </Button>
          <Button onClick={() => handleClose(true)}>Download Anyway</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
