
const ProfilePage = ({ onClose }: { onClose: () => void }) => {

  let user = null;
  for (let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    if (!key) continue;
    try {
        const data = JSON.parse(localStorage.getItem(key) || "{}")
        if (data.isAuthenticated) {
            user = data;
            break;
        }
    } catch {}
  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white shadow-lg p-8 text-2xl w-full max-w-md relative rounded">
            <button 
              className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-gray-700"
              onClick={onClose}
            > &times;
            </button>
            <h2 className="mb-4 font-bold">Account</h2>
            <p>
                <strong>Name:</strong> {user?.name || "N/A"}
            </p>
            <p>
                <strong>Email:</strong> {user?.email || "N/A"}
            </p>
        </div>
    </div>
  )
}

export default ProfilePage