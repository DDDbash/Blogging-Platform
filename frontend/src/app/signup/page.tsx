import AppLayout from "@/components/common/AppLayout";

import SignupForm from "./components/SignupForm";

const Signup = () => {
  return (
    <AppLayout>
      <div className="container flex h-[calc(100vh-80px)] items-center  justify-center">
        <div className="flex w-96 flex-col gap-6 rounded-lg px-8 py-4 shadow-lg">
          <h3>Create an account</h3>

          <SignupForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default Signup;
