import { useForm } from 'react-hook-form';

const CheckoutForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("nombre")} placeholder="Nombre" required />
      <input {...register("direccion")} placeholder="Dirección" required />
      <button type="submit">Realizar Pedido</button>
    </form>
  );
};

export default CheckoutForm;
