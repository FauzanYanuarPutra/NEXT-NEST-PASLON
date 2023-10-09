export const Input = (props: any) => {
  const { type, name, value, onChange, required = false, placeholder } = props;

  return (
    <input
      {...{type, name, value, onChange, placeholder}}
      id={name}
      className="rounded-lg border p-2 placeholder:text-gray-400"
      {...required && { required: true }}
    />
  )
}