export default function cutKilo(val) {
  if (typeof val !== 'string') val += '';
  return val.replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/g, ' ');
}
