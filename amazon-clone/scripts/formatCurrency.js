export function format(value) {
    value = Math.round(value / 100).toFixed(2);
    return value;
}