import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const handleLogin = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const email = formData.get("email")
    const password = formData.get("password")


    try {

      const response = await fetch(
  `https://eligifygovernmentscheme-3.onrender.com/auth/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  {
    method: "POST",
  }
)


      const data = await response.json()

      console.log(data)


      if (response.ok) {

        setIsLoggedIn(true)

      } else {

        alert("Login failed")

      }

    } catch (error) {

      console.error(error)

      alert("Backend se connection nahi ho raha")

    }
  }


  const handleLogout = () => {
    setIsLoggedIn(false)
  }


  // Login successful hone ke baad Dashboard
  if (isLoggedIn) {
    return (
      <Dashboard
        onLogout={handleLogout}
      />
    )
  }


  return (
    <div className="login-page">

      {/* Left Side */}

      <div className="login-left">

        <div className="brand">

          <div className="brand-icon">
            E
          </div>

          <span>
            Eligify
          </span>

        </div>


        <div className="welcome">

          <h1>
            Empowering Entrepreneurs.
            <br />
            Unlocking Opportunities.
          </h1>


          <p>
            Discover government schemes and financial opportunities
            designed to help your business grow.
          </p>


          <div className="ai-badge">
            ✦ Powered by AI
          </div>

        </div>

      </div>


      {/* Right Side */}

      <div className="login-right">

        <div className="login-card">

          <h2>
            Welcome back
          </h2>


          <p className="subtitle">
            Sign in to continue to your Eligify account
          </p>


          <form onSubmit={handleLogin}>

            <label>
              Email address
            </label>


            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />


            <label>
              Password
            </label>


            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />


            <div className="login-options">

              <label className="remember">

                <input type="checkbox" />

                Remember me

              </label>


              <a href="#">
                Forgot password?
              </a>

            </div>


            <button
              type="submit"
              className="login-button"
            >
              Sign in
            </button>

          </form>


          <div className="divider">

            <span>
              or
            </span>

          </div>


          <p className="register-text">

            Don't have an account?{' '}

            <a href="#">
              Create account
            </a>

          </p>

        </div>

      </div>

    </div>
  )
}

export default App