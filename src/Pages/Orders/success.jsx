import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <section className="w-full p-10 py-20 flex items-center justify-center flex-col gap-2">
      <img src="/check.png" width="120" />
      <h1 className="mb-0 text-lg sm:text-2xl font-[600] text-gray-800">
        Your order is placed
      </h1>
      <p className="text-sm sm:text-base text-center mb-3 text-gray-600">
        Thank you for your Payment.
      </p>
      <Link to="/">
        <Button className="btn-border btn-org">BACK TO HOME</Button>
      </Link>
    </section>
  );
}
