import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import Link from "next/link";

const Card = ({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={
        "rounded-lg overflow-hidden shadow-lg p-4 mb-4 " + (className || "")
      }
    >
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 text-base">{children}</p>
    </div>
  );
};

export default function Home() {
  return (
    <Dashboard>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="w-full md:w-1/3 px-2">
          {/* content for first column */}
          <Card title="To-do">
            <div className="flex flex-col space-y-2">
              <Button>Verify Your Email</Button>
              <Link href="/profile/bind-nric/">
                <Button>Bind Your IC Number</Button>
              </Link>
              <Button>Add Students</Button>
            </div>
          </Card>
          <Card title="Announcements">
            This is a description of my card. It can be multiple lines long.
          </Card>
        </div>
        <div className="w-full md:w-1/3 px-2">
          {/* content for second column */}
          <Card title="Your Payments">
            <Card title="Accepted" className="bg-green-100">
              <span className="text-xl">RM30.00</span>
            </Card>
            <Card title="Pending" className="bg-yellow-100">
              <span className="text-xl">RM10.00</span>
            </Card>
            <Card title="Rejected" className="bg-red-100">
              <span className="text-xl">RM10.00</span>
            </Card>
            OR
            <div className="bg-white rounded-lg overflow-hidden shadow-lg text-center">
              <div className="flex">
                <div className="w-1/3 bg-green-100 px-4 py-6">
                  <span className="font-bold">Accepted</span>
                  <br />
                  RM30.00
                </div>
                <div className="w-1/3 bg-yellow-100 px-4 py-6">
                  <span className="font-bold">Pending</span>
                  <br />
                  RM45.00
                </div>
                <div className="w-1/3 bg-red-100 px-4 py-6">
                  <span className="font-bold">Rejected</span>
                  <br />
                  RM15.00
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="w-full md:w-1/3 px-2">
          {/* content for third column */}
          <Card title="Important Links">
            This is a description of my card. It can be multiple lines long.
            <Link href="/guide">
              <Button>
                <p>Guide to use MCC Hub.</p>
                <p>This link actually works.</p>
              </Button>
            </Link>
          </Card>
          <Card title="Important Dates">
            This is a description of my card. It can be multiple lines long.
            <div className="container mx-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="text-left">Date</th>
                    <th className="text-left">Event Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">April 20, 2023</td>
                    <td className="border px-4 py-2">
                      MCC Registration Deadline
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">April 25, 2023</td>
                    <td className="border px-4 py-2">MCC</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">May 25, 2023</td>
                    <td className="border px-4 py-2">MCO Qualifying Rounds</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">June 25, 2023</td>
                    <td className="border px-4 py-2">
                      MCO Training Camp and MCO
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">July 25, 2023</td>
                    <td className="border px-4 py-2">APIO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </Dashboard>
  );
}
