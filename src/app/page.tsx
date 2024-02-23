import ButtonReloadPage from "./components/Button/ButtonReloadPage";
import FormRegisterProduct from "./components/Form/FormRegisterProduct";
import TableListProducts from "./components/Table/TableListProducts";

export default function Home() {
  return (
    <div className="relative">
      <div className="flex justify-center items-center mt-12 gap-32 max-[570px]:gap-12">
        <h1 className="text-2xl text-center font-bold">Cadastrar Produto</h1>
        <ButtonReloadPage/>
      </div>
      <div className="w-[900px] max-[960px]:w-[90%] mx-auto">
        <FormRegisterProduct/>
      </div>
      <div className="mt-8 w-[900px] max-[960px]:w-[90%] mx-auto border rounded-lg p-5 shadow-lg border-zinc-500">
        <TableListProducts/>
      </div>
    </div>
  );
}
