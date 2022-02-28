import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

function DatePicker({
  toolbar = false,
  helperText,
  format = "yyyy-MM-dd",
  ...rest
}) {
  return (
    <KeyboardDatePicker
      disableToolbar={!toolbar}
      autoOk
      helperText={helperText || ""}
      variant="inline"
      format={format || "yyyy-MM-dd"}
      {...rest}
    />
  );
}

export default DatePicker;
