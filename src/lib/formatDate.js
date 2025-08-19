export function formateDate(date) {
  return new Date(date)
    .toLocaleString("en-US", {
      year: "numeric",
      day: "2-digit",
      month: "long",
    })
    .replaceAll("/", "-");
}
