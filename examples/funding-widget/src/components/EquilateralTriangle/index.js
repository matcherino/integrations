import React from 'react';
import omit from 'lodash/omit';

/**
 * Creates an equalateral triangle inside a given SVG parent node.
 * @Author Julien Etienne - 2015
 * @param  {Number} sideLength     - Length of side
 * @param  {Array} centerPosition  - central position the of triangle.
 * @param  {Object} parentNode     - The parentNode of the new triangle.
 * @return {Object}                - The polygon element.
 */
export default function EquilateralTriangle(props) {
  const {cx, cy, sideLength} = props;
  const cen = [cx, cy];

  const pi = 3.141592653589793238462643383; // more accuracy
  const halfSide = sideLength / 2;
  // Inner innerHypotenuse angle = 120, hyp = half side. Cos 120 * adjacent
  const innerHypotenuse = halfSide * (1 / Math.cos(30 * pi / 180));

  // SqRt(Hyp^2 - Adj^2) pythagoras
  const innerOpposite = halfSide * (1 / Math.tan(60 * pi / 180));

  const leftVertex = [];
  const rightVertex = [];
  const topVertex = [];

  leftVertex[0] = cen[0] - halfSide;
  leftVertex[1] = cen[1] + innerOpposite;

  rightVertex[0] = cen[0] + halfSide;
  rightVertex[1] = cen[1] + innerOpposite;

  topVertex[0] = cen[0];
  topVertex[1] = cen[1] - innerHypotenuse;

  const points = topVertex[0] +
    ',' +
    topVertex[1] +
    ' ' +
    rightVertex[0] +
    ',' +
    rightVertex[1] +
    ' ' +
    leftVertex[0] +
    ',' +
    leftVertex[1];

  const newProps = {...omit(props, ['cx', 'cy', 'sideLength']), points};

  console.log('eqtriangle', newProps);

  return <polygon {...newProps} />;
}
