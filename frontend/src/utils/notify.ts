export function notify({
  message,
  description,
}: {
  message: string;
  description: string;
}) {
  console.log(`${message}, ${description}`);
}
