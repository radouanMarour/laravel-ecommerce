export default function OrderHistory({ orders }) {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-medium">Order History</h2>
            {orders?.map(order => (
                <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-medium">Order #{order.id}</h3>
                        <span className={`px-2 py-1 rounded ${order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-gray-600">Total: ${order.total}</p>
                    <p className="text-gray-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
}