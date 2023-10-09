export const Label = (props: any) => {
  const { htmlFor } = props;
  return (
    <label htmlFor={htmlFor} className=" capitalize">{htmlFor}</label>
  )
}