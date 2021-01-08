import React, { useState } from 'react'
import { CircularProgress,IconButton,Collapse } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
function CrudStates(props) {
    const [open, setOpen] = useState(true);
    return (
        <div>
             <h4>
            {props.loading && <div><CircularProgress  color="secondary" /></div>}
            {props.error && <div><small><Alert severity="error">{props.error}</Alert></small></div>}
            {props.success_msg && <div>{props.success_msg?setOpen(true):setOpen(false)}<small><Collapse in={open}>  <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {props.success_msg}
        </Alert>
        </Collapse>
</small></div>}
        </h4>
        </div>
    )
}

export default CrudStates