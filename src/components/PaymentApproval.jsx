function PaymentApproval() {
  const payments = [
    { id: 1, name: "John Doe", amount: "$200", status: "Customer Confirmed" },
    { id: 2, name: "Jane Smith", amount: "$150", status: "Customer Confirmed" },
    {
      id: 3,
      name: "Mike Johnson",
      amount: "$300",
      status: "Customer Confirmed",
    },
    { id: 4, name: "Anna Lee", amount: "$100", status: "Customer Confirmed" },
    {
      id: 5,
      name: "Chris Evans",
      amount: "$250",
      status: "Customer Confirmed",
    },
    {
      id: 6,
      name: "Robert Brown",
      amount: "$180",
      status: "Customer Confirmed",
    },
  ];
  return (
    <>
      <section id="payments">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 w-full text-center ">
          Payment Approvals
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex justify-between items-center mb-4"
            >
              <div>
                <p className="text-gray-800">
                  {payment.name} - {payment.amount}
                </p>
                <p className="text-gray-600">Status: {payment.status}</p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                  Approve Payment
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default PaymentApproval;
