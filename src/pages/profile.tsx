import Dashboard from "@/components/Dashboard";
import { useForm, SubmitHandler } from "react-hook-form";

interface Profile {
  name: string;
}

export default function Profile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Profile>();

  const onSubmit: SubmitHandler<Profile> = (data) => {
    console.log(data);
  };

  return (
    <Dashboard>
      <div className="flex min-h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full space-y-8 max-w-md">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Your Profile
            </h2>
          </div>
          <form
            className="mt-8 space-y-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="-space-y-px rounded-md shadow-sm ">
              <div className="w-full">
                <div className="px-2 py-1">
                  <label htmlFor="name">Full Name</label>
                </div>
                <input
                  {...register("name", {
                    required: "Full name is required.",
                  })}
                  id="name"
                  type="text"
                  className={
                    "rounded-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  }
                  placeholder="Full Name"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  );
}
