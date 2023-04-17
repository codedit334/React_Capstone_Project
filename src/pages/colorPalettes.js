import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchColorPalettes } from "../redux/colorPalettes/colorPalettesSlice";
import palette from "../components/palette";

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
    <div className="color-categories">
      <h1>Color Palettes</h1>
      {status === "loading" && <div>loading...</div>}
      {status === "succeeded" && <div className="color-categories-palettes">{colorPalettes.map((palette) => <Link to={`/colors/${palette}`}>{palette}</Link> )}</div>}
      {status === "failed" && <div>{error}</div>}
    </div>
  );
}
