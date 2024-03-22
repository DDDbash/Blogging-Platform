import AppLayout from "@/components/common/AppLayout";

import SignInForm from "./components/SignInForm";

const SignIn = () => {
  return (
    <AppLayout>
      <div className="container flex h-[calc(100vh-80px)] items-center  justify-center">
        <div className="flex w-96 flex-col gap-6 rounded-lg px-8 py-4 shadow-lg">
          <h3>SignIn</h3>

          <SignInForm />
        </div>
      </div>
    </AppLayout>
  );
};

export default SignIn;
