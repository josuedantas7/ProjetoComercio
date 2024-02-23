import ButtonReloadPage from "./components/Button/ButtonReloadPage";
import FormRegisterProduct from "./components/Form/FormRegisterProduct";
import TableListProducts from "./components/Table/TableListProducts";

export default function Home() {
  return (
    <div className="relative">
      <div className="w-[900px] relative flex mt-12 justify-center max-[960px]:w-[90%] mx-auto">
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
