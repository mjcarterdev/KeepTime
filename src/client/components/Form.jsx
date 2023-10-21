import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSubmit } from 'react-router-dom';

const Form = (props) => {
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(props.validator) });

  return (
    <form
      method="post"
      onSubmit={(event) => {
        const target = event.currentTarget;
        handleSubmit(() => {
          submit(target, { method: 'post' });
        })(event);
      }}
    >
      {props.children(register, errors)}
    </form>
  );
};

export default Form;
