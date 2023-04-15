import Link from "next/link";

export default function LoginLanding() {
  return (
    <div>
      <div className="min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              MCC Registration
            </h2>

            <h3 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900">
              I am a...
            </h3>
          </div>
        </div>

        <div className="mt-6 mx-auto md:max-w-4xl text-center grid md:grid-flow-col justify-stretch text-3xl font-bold">
          <Link href="/teacher/login" className="block p-2 bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4">
            Teacher
          </Link>
          <Link href="/student/login" className="block p-2 bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4">
            Student
          </Link>
          <Link href="/parent/login" className="block p-2 bg-blue-100 hover:bg-blue-200 rounded-lg drop-shadow-md m-2 md:py-16 mx-4">
            Parent
          </Link>
        </div>
      </div>
    </div>
  );
}
