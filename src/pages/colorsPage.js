import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
export default function ColorsPage() {
  const { category } = useParams();
  const colors = useLoaderData();

  return (
    <div>
      <h2>{category}</h2>
      {colors.map((color) => (
        <div>{color}</div>
      ))}
    </div>
  );
}

export const colorsLoader = async ({ params }) => {
  const { category } = params;

  const response = await fetch(`http://colormind.io/api/${category}`);
  const colorPalettes = await response.json();
  return colorPalettes;
};
