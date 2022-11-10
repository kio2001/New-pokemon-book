import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/api.module.css";
import { BrowserRouter, useNavigate } from "react-router-dom"
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";

import { TextField, ListItem, ListItemText } from "@material-ui/core/";

interface Props {
  text: string;
}

const ListItems: React.FC<Props> = (props) => (
  <ListItem alignItems="center" divider>
    <ListItemText primary={props.text} />
  </ListItem>
);

const Top = () => {
  const [status, setStatus] = useState<string[]>([]);

  const [keyword, setKeyword] = useState("");
  const [showLists, setShowLists] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(status);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?offset=1&limit=1134")
      .then((res) => {
        console.log(res);
        let datas = new Array();
        res.data.results.forEach((spot: any) => {
          datas.push(spot.name);
        });
        setStatus(datas);
      });
    if (keyword === "") {
      setFilteredProducts(status);
      return;
    }

    const searchKeywords = keyword
      .trim()
      .toLowerCase()
      .match(/[^\s]+/g);

    if (searchKeywords === null) {
      setFilteredProducts(status);
      return;
    }

    const result = status.filter((status) =>
      searchKeywords.every((kw) => status.toLowerCase().indexOf(kw) !== -1)
    );

    setFilteredProducts(result.length ? result : ["No Item Found"]);
  }, [keyword]);

  return (
    <>
    
      <TextField
        id="field"
        color="secondary"
        variant="outlined"
        label="enter keywords"
        onChange={(e) => setKeyword(e.target.value)}
        onClick={() => setShowLists(true)}
      />
      
        {showLists &&
          filteredProducts.map((v: any, i: any) => (
            <Button onClick={() => navigate(`/book/?${v}`)}>
              <ListItems  key={i} text={v} />
            </Button>
          ))}
      
    </>
  );
};
export default Top;
