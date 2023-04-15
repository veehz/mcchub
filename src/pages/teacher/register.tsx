import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginInput {
  email: String;
  password: String;
  confirmPassword: String;
}

export default function TeacherLogin() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInput>();
  const onSubmit: SubmitHandler<LoginInput> = (data) => console.log(data);

  return (
    <div>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register for a teacher account
            </h2>
          </div>

          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email address is required.",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Entered value does not match email format.",
                    },
                  })}
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className={
                    "rounded-t-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  }
                  placeholder="Email Address"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Email Address
                </label>
                <input
                  {...register("password", {
                    minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters.",
                    },
                    maxLength: {
                        value: 20,
                        message: "Password must have less than 20 characters.",
                    },
                    required: "Password is required.",
                  })}
                  id="password"
                  type="password"
                  autoComplete="password"
                  required
                  className={
                    "relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  }
                  placeholder="Password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword", {
                    validate:{
                        validateSamePassword: (value, formValues) => {
                            return value === formValues.password || "Passwords do not match.";
                        }
                    }
                  })}
                  id="confirmPassword"
                  type="password"
                  autoComplete="password"
                  required
                  className={
                    "rounded-b-md relative block w-full border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  }
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <div
              className={
                "rounded-md p-2 text-sm " + errors ? "text-red-500" : ""
              }
            >
              <div>{errors?.email?.message}</div>
              <div>{errors?.password?.message || errors?.confirmPassword?.message}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Not a teacher?
                </Link>
              </div>
              <div className="text-sm">
                <Link
                  href="./login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
