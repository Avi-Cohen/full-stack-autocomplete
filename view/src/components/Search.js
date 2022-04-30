import React, { useState, useEffect } from "react";
import contactsService from "../services/contacts";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ulStyle = {
  height: "30vh",
  overflowY: "overlay",
  listStyle: "none",
  width: "16vw",
  padding: "0",
};
const liStyle = {
  paddingBottom: 3.5,
  borderTop: "dotted lightGray 0.5px",
};
export const Search = () => {
  const [term, setTerm] = useState("");
  const [rollingTerm, setRollingTerm] = useState("");
  const [emails, setEmails] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => setRollingTerm(term), 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    setResults(
      emails.filter(
        (email) => rollingTerm && email.toLowerCase().includes(rollingTerm)
      )
    );
  }, [emails, rollingTerm]);

  useEffect(() => {
    async function fetchData() {
      setEmails(await contactsService.getEmailsList(rollingTerm));
    }
    fetchData();
  }, [rollingTerm]);

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Email List"
        variant="outlined"
        onChange={(e) => setTerm(e.target.value)}
      />
      <ul style={ulStyle}>
        {results.map((result) => (
          <li style={liStyle} key={result}>
            {result}
          </li>
        ))}
      </ul>
    </Box>
  );
};
