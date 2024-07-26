import { baseUrl } from '../main';

const Signup = ({ setActiveTab }) => {
  const handleGoogleAuth = () => {
    try {
      window.location.href = `${baseUrl}/auth/google`;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border border-gray-300 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" required className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" name="password" required className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input type="password" name="confirmPassword" required className="w-full px-3 py-2 border rounded-lg" />
        </div>
        <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">Signup</button>
      </form>
      <p className="text-center mt-4">Already have an account? <span className="text-primary cursor-pointer" onClick={() => setActiveTab('login')}>Login</span></p>
      <div className="flex justify-center">
        <button className="bg-primary text-white py-2 px-4 mt-4 rounded-lg" onClick={handleGoogleAuth}>Signup with <strong>Google</strong></button>
      </div>
    </div>
  );
};

export default Signup;
