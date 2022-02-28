import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { data } from "../../data";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import LuxonUtils from "@date-io/luxon";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
} from "@material-ui/core";
import DatePicker from "../../helper/DatePicker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  textAlign: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: "40px",
  },
  upperTextAlign: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

export default function UserList() {
  const classes = useStyles();
  const [agent, setAgent] = useState("");
  const [users, setUsers] = useState([]);
  const [price, setPrice] = useState("");
  console.log({ price });

  useEffect(() => {
    setUsers(data);
  }, []);

  // ---- search ----
  const [query, setQuery] = useState("");

  // --- Dialog ----
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);
  const handleBookProduct = () => {
    setOpen(false);
    setOpenDialog(true);
  };
  // --- Second Dialog ----
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = () => setOpenDialog(false);

  // --- get menu Item value ------------
  const handleMenuClick = (event) => {
    data.map((val) => {
      if (val.name === event.target.value) {
        setPrice(val.price);
      }
    });
    setAgent(event.target.value);
  };

  // ---- date ---
  const [date, setDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const Difference_In_Time = toDate?.getTime() - date?.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="flex-end" marginBottom="20px">
            <input
              style={{
                minWidth: "250px",
                padding: "10px",
              }}
              className="search"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="left">Co</TableCell>
                  <TableCell align="left">Availability</TableCell>
                  <TableCell align="left">Needing_repair</TableCell>
                  <TableCell align="center">Durability</TableCell>
                  <TableCell align="center">Mileage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((asd) => asd.name.toLowerCase().includes(query))
                  .map((user) => (
                    <TableRow key={user.code}>
                      <TableCell align="right">{user.id}</TableCell>
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="left">{user.code}</TableCell>
                      <TableCell align="left">
                        {user.availability.toString()}
                      </TableCell>
                      <TableCell align="left">
                        {user.needing_repair.toString()}
                      </TableCell>
                      <TableCell align="center">{user.durability}</TableCell>
                      <TableCell align="center">{user.mileage}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper className={classes.paper}>
          <Box display="flex" justifyContent="flex-end">
            <Box marginBottom="40px" marginTop="20px">
              <Button onClick={handleOpen} variant="contained" color="primary">
                BOOK
              </Button>
            </Box>
            <Box marginBottom="40px" marginTop="20px" marginLeft="10px">
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleClickOpen(e)}
              >
                RETURN
              </Button>
            </Box>
          </Box>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
            <DialogTitle>Book a Product</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <Select
                  fullWidth
                  value={agent ?? " "}
                  // onChange={(event) => setAgent(event.target.value)}
                  onChange={handleMenuClick}
                >
                  {data?.map(
                    (item) =>
                      item?.availability && (
                        <MenuItem key={item?.code} value={item?.name}>
                          {item?.name || "null"}
                        </MenuItem>
                      )
                  )}
                </Select>
              </FormControl>
              <div
                style={{
                  display: "flex",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <div style={{ marginRight: "20px" }}>
                    <DatePicker
                      label="From"
                      value={date}
                      onChange={(value) => setDate(value)}
                    />
                  </div>
                  <DatePicker
                    label="To"
                    value={toDate}
                    onChange={(value) => setToDate(value)}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{ width: "40px", marginRight: "10px" }}
                  variant="text"
                  color="#1976d2"
                  onClick={handleBookProduct}
                >
                  Yes
                </Button>
                <Button
                  onClick={handleClose}
                  style={{ width: "40px" }}
                  variant="text"
                  color="#1976d2"
                >
                  No
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="xs"
          >
            <DialogTitle>Book a Product</DialogTitle>
            <div className={classes.textAlign}>
              <div className={classes.upperTextAlign}>
                Your esltimation price is ${price * Difference_In_Days}
              </div>
              <div>Do you want to proceed?</div>
            </div>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  style={{ width: "40px", marginRight: "10px" }}
                  variant="text"
                  color="primary"
                >
                  Yes
                </Button>
                <Button
                  onClick={handleCloseDialog}
                  style={{ width: "40px" }}
                  variant="text"
                  color="primary"
                >
                  No
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </Paper>
      </Container>
    </div>
  );
}
