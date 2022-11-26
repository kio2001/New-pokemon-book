import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import "./styles/styles.module.css";
import Paper from "@mui/material/Paper";
import { MenuList } from "@mui/material";
const Details = () => {
  const [display, setDisplay] = useState("block");
  const [id, setId] = useState("");
  const [a, setA] = useState("");
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const search = useLocation().search;
  const poke = search.slice(1);

  console.log(poke);
  function sleep(time: any) {
    return new Promise(function (resolve, reject) {
      window.setTimeout(resolve, time);
    });
  }

  axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`).then(async (res) => {
    await sleep(2000);
    console.log(res);
    setA(res.data.sprites.other["official-artwork"].front_default);
    setType(res.data.types[0].type.name);
    setId(res.data.id);
    const Wei: any = res.data.weight / 10;
    setWeight(Wei);
    const Hei: any = res.data.height * 10;
    setHeight(Hei);
    setDisplay("none");
    console.log(display);
  });

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          height: "600px",
          width: "600px",
          margin: "30px auto",
          paddingtop: "20px",
        }}
      >
        <Box position="relative">
          <CircularProgress
            size="100px"
            color="success"
            sx={{
              position: "absolute",
              display: { display },
              margin: "200px",
              ml: "240px",
            }}
          />
          <img src={a} alt="pokemon" />
          <h3>Name　:　{poke}</h3>
          <p>pokemonID　:　{id}</p>
          <p>type　:　{type}</p>
          <p>weight　:　{weight}　kg</p>
          <p>height　:　{height}　cm</p>
          <Button href="/top" variant="contained" color="success">
            Back
          </Button>
        </Box>
      </Paper>
    </>
  );
};
export default Details;
export {};
