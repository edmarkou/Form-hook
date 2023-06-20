import style from "./App.module.css";
import { Form } from "./components/Form";
import ErrorMessage from "./components/Form/ErrorMessage";
import FormHeader from "./components/Form/FormHeader";
import useFrom from "./hooks/useForm";

function App() {
  const { register, handleSubmit, error } = useFrom({
    name: "",
    email: "",
    phone: "",
    birthYear: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className={style.container}>
      <Form onSubmit={handleSubmit}>
        <FormHeader text="User registration" />
        {register({
          id: "name",
          label: "Name",
          placeholder: "Your name",
        })}
        {register({
          id: "email",
          label: "Email",
          placeholder: "Your email",
        })}
        {register({
          id: "phone",
          label: "Phone number",
          placeholder: "370-623-1234",
          type: "tel",
          pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
        })}
        {register({
          id: "birthYear",
          label: "Birth year",
          placeholder: "Your birth year",
          type: "number",
        })}
        {register({
          id: "password",
          label: "Password",
          placeholder: "Your password",
          type: "password",
        })}
        {register({
          id: "confirmPassword",
          label: "Confirm password",
          placeholder: "Confirm your password",
          type: "password",
        })}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {register({ type: "submit" })}
      </Form>
    </div>
  );
}

export default App;
