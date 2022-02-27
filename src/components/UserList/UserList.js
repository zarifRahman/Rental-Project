import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
import Avatar from "@material-ui/core/Avatar";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import { data } from "../../data";
import {
  Dialog,
  DialogTitle,
  FormControl,
  MenuItem,
  Modal,
  Select,
} from "@material-ui/core";

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
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function UserList() {
  const classes = useStyles();
  const [agent, setAgent] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(data);
  }, []);

  // const UsersGet = () => {
  //   fetch("https://www.mecallapi.com/api/users")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUsers(result);
  //     });
  // };

  // const UpdateUser = (id) => {
  //   window.location = "/update/" + id;
  // };

  // const UserDelete = (id) => {
  //   var data = {
  //     id: id,
  //   };
  //   fetch("https://www.mecallapi.com/api/users/delete", {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/form-data",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((result) => {
  //       alert(result["message"]);
  //       if (result["status"] === "ok") {
  //         UsersGet();
  //       }
  //     });
  // };
  // ---- search ----
  const [query, setQuery] = useState("");

  // --- Modal ----
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickOpen = () => setOpen(true);

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
        <Box display="flex" justifyContent="flex-end">
          <Box marginBottom="40px" marginTop="20px">
            <Button onClick={handleOpen} variant="contained" color="primary">
              BOOK
            </Button>
            {/* <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal> */}
          </Box>
          <Box marginBottom="40px" marginTop="20px" marginLeft="10px">
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleClickOpen(e)}
            >
              RETURN
            </Button>
            <Dialog
              sx={{
                bgcolor: "background.paper",
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                width: 700,
              }}
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Book a Product</DialogTitle>
              <FormControl
                sx={{
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  borderRadius: 2,
                  p: 2,
                  width: 700,
                }}
              >
                <Select
                  // fullWidth
                  value={agent}
                  onChange={(event) => setAgent(event.target.value)}
                >
                  {data?.map((item) => {
                    return (
                      <MenuItem key={item?.code} value={item?.name}>
                        {item?.name || "null"}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Dialog>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
