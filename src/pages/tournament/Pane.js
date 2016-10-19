import React from 'react';

export default function Pane({title, children, className}) {
  const classes = 'mno-pane' + (className ? ' ' + className : '');

  return (
    <section className={classes}>
      <header><span>{title}</span></header>
      {children}
    </section>
  );
}
