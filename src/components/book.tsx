import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import {Loading} from './Loading';
import { useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import "./styles/styles.module.css";
import { margin } from "@mui/system";
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
  
  axios.get(`https://pokeapi.co/api/v2/pokemon/${poke}`).then((res) => {

    console.log(res);
    setA(res.data.sprites.other["official-artwork"].front_default);
    setType(res.data.types[0].type.name);
    setId(res.data.id);
    setWeight(res.data.weight);
    setHeight(res.data.height);
    setDisplay("none");
    console.log(display);
  });

  return (
    <>
      <Box
      textAlign="center"
      position="relative">
      <CircularProgress 
      size="200px"
      
      sx={{ position:"absolute",
            display:{display},
            margin:"200px",
            marginLeft:"600px"
          }} />
      <img src={a} alt="pokemon" />
      <p>pokemonID　:　{id}</p>
      <p>type　:　{type}</p>
      <p>weight　:　{weight}</p>
      <p>height　:　{height}</p>
      </Box>
    </>
  );
};
export default Details;
export {} 