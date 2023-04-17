import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
import { useDispatch, useSelector } from "react-redux";
import { fetchColorPalettes } from "../redux/colorPalettes/colorPalettesSlice";

export default function ColorPalettes() {
  const dispatch = useDispatch();
  const palettes = useSelector((state) => state.colorPalettes);
  const { status, error, colorPalettes } = palettes;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchColorPalettes());
    }
  });
  return (
    <div className={css(styles.colorCategories)}>
      <h1>Color Palettes</h1>
      {status === "loading" && <div>loading...</div>}
      {status === "succeeded" && <div className={css(styles.colorCategoriesPalettes)}>{colorPalettes.map((palette) => <Link to={`/colors/${palette}`}>{palette}</Link> )}</div>}
      {status === "failed" && <div>{error}</div>}
    </div>
  );
}

const styles = StyleSheet.create({
    colorCategories: {
      width: "100%",
    },
    colorCategoriesPalettes: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
})
