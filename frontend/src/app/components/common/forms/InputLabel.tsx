import { Input } from "./Input";
import { Label } from "./Label";

export const LabelInput = (props: any) => {
  const { htmlFor, type, name, value, onChange, required = false, placeholder } = props;
  return (
    <div className="flex flex-col">
      <Label htmlFor={htmlFor} />
      <Input  id={htmlFor} {...{ type, name,  value ,placeholder, onChange, required}}   /> 
    </div>
  )
}