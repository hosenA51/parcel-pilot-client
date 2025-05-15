import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/all-users');
      return res.data;
    },
  });

  const users = data?.users || [];

  const handleRoleChange = async (email, role) => {
    try {
      await axiosSecure.patch(`/users/role/${email}`, { role });
      refetch(); 
    } catch (error) {
      console.error('Error changing role:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-2">Name</th>
              <th className="border border-gray-300 px-2 py-2">Phone Number</th>
              <th className="border hidden sm:hidden border-gray-300 px-2 py-2">Parcels Booked</th>
              <th className="border hidden sm:hidden border-gray-300 px-2 py-2">Total Spent</th>
              <th className="border border-gray-300 px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 px-2 py-2">{user.name}</td>
                <td className="border border-gray-300 px-2 py-2">{user.phone || 'N/A'}</td>
                <td className="border hidden sm:hidden border-gray-300 px-4 py-2">{user.parcelsBooked || 0}</td>
                <td className="border hidden sm:hidden border-gray-300 px-4 py-2">{user.totalSpent || 0}</td>
                <td className="border border-gray-300 px-2 py-2">
                  {user.role !== 'delivery-men' && (
                    <button
                      onClick={() => handleRoleChange(user.email, 'delivery-men')}
                      className="px-2 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                    >
                      Make Delivery Man
                    </button>
                  )}
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleRoleChange(user.email, 'admin')}
                      className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
