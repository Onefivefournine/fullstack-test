export default function fixFloats(value, digits = 2) {
  let num = +value; // prevent strings
  if (typeof num !== 'number' || isNaN(num)) return value;
  return +num.toFixed(digits);
}
