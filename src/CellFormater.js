import React, { Component } from "react";

export function CellFormater(props) {
  const value = Number(props.value);
  console.log("value", value);
  const text = value.toLocaleString(undefined, {
    style: "currency",
    currency: "EUR"
  });

  return <span>{text}</span>;
}
