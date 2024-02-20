import { Suspense } from "react";
import FormRegisterProduct from "./components/Form/FormRegisterProduct";
import TableListProducts from "./components/Table/TableListProducts";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl text-center font-bold mt-12">Cadastrar Produto</h1>
      <div className="w-[900px] max-[960px]:w-[90%] mx-auto">
        <FormRegisterProduct/>
      </div>
      <div className="mt-8 w-[900px] max-[960px]:w-[90%] mx-auto border rounded-lg p-5 shadow-lg border-zinc-500">
        <Suspense fallback={<div>Carregando...</div>}>
          <TableListProducts/>
        </Suspense>
      </div>
    </div>
  );
}
