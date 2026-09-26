import { useEffect, useState } from 'react'
import './Dashboard.css'
import AIChatbot from '../components/AIChatbot'

function Dashboard({ onLogout }) {

  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)

  const [profile, setProfile] = useState({
    businessType: '',
    location: '',
    gender: '',
    category: '',
    businessStage: ''
  })

  const [profileSaved, setProfileSaved] = useState(false)
  const [matching, setMatching] = useState(false)
  const [matchedSchemes, setMatchedSchemes] = useState([])
  const [selectedScheme, setSelectedScheme] = useState(null)


  useEffect(() => {

    const fetchSchemes = async () => {

      try {

       const response = await fetch(
  'https://eligifygovernmentscheme-3.onrender.com/schemes/'
)

        const data = await response.json()

        if (response.ok) {
          setSchemes(data.schemes)
        }

      } catch (error) {

        console.error('Scheme loading error:', error)

      } finally {

        setLoading(false)

      }

    }

    fetchSchemes()

  }, [])


  const handleProfileChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })

  }


  const getMatchPercentage = (score) => {

    return Math.min(
      98,
      Math.max(55, score * 10)
    )

  }


  const getMatchReasons = (scheme) => {

    const reasons = []

    const schemeText = (
      (scheme.target_groups || []).join(' ')
      + ' '
      + (scheme.description || '')
    ).toLowerCase()


    if (
      profile.gender === 'female'
      && schemeText.includes('women')
    ) {
      reasons.push('Women entrepreneurs')
    }


    if (
      profile.category === 'sc'
      && schemeText.includes('sc')
    ) {
      reasons.push('SC entrepreneurs')
    }


    if (
      profile.category === 'st'
      && schemeText.includes('st')
    ) {
      reasons.push('ST entrepreneurs')
    }


    if (
      profile.category === 'obc'
      && schemeText.includes('obc')
    ) {
      reasons.push('OBC entrepreneurs')
    }


    if (
      profile.category === 'minority'
      && schemeText.includes('minority')
    ) {
      reasons.push('Minority entrepreneurs')
    }


    if (
      profile.businessStage === 'new'
      && schemeText.includes('new')
    ) {
      reasons.push('New business')
    }


    if (
      profile.businessStage === 'idea'
      && schemeText.includes('entrepreneur')
    ) {
      reasons.push('Entrepreneur support')
    }


    if (
      profile.location
      && (
        String(scheme.location || '')
          .toLowerCase()
          .includes(profile.location.toLowerCase())
        || String(scheme.location || '')
          .toLowerCase()
          .includes('all india')
      )
    ) {
      reasons.push('Available in your location')
    }


    if (reasons.length === 0) {
      reasons.push('Entrepreneur support')
    }


    return reasons.slice(0, 3)

  }


  const handleProfileSubmit = async (e) => {

    e.preventDefault()

    setMatching(true)
    setProfileSaved(false)

    try {

      const response = await fetch(
  'https://eligifygovernmentscheme-3.onrender.com/schemes/match',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profile)
  }
)


      const data = await response.json()


      if (response.ok) {

        setMatchedSchemes(data.schemes)
        setProfileSaved(true)

        setTimeout(() => {

          document
            .getElementById('matches')
            ?.scrollIntoView({
              behavior: 'smooth'
            })

        }, 200)

      } else {

        alert('Scheme matching failed')

      }

    } catch (error) {

      console.error('Matching error:', error)

      alert('Backend se connection nahi ho raha')

    } finally {

      setMatching(false)

    }

  }


  const handleDocuments = (scheme) => {

    setSelectedScheme(scheme)

    setTimeout(() => {

      document
        .getElementById('documents')
        ?.scrollIntoView({
          behavior: 'smooth'
        })

    }, 100)

  }


  return (

    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">

        <div className="dashboard-brand">

          <div className="dashboard-logo">
            E
          </div>

          <span>
            Eligify
          </span>

        </div>


        <nav className="sidebar-nav">

          <a href="#" className="nav-item active">
            <span>⌂</span>
            Dashboard
          </a>

          <a href="#schemes" className="nav-item">
            <span>⌕</span>
            Find Schemes
          </a>

          <a href="#profile" className="nav-item">
            <span>◉</span>
            My Profile
          </a>

          <a href="#applications" className="nav-item">
            <span>▣</span>
            Applications
          </a>

          <a href="#documents" className="nav-item">
            <span>◫</span>
            Documents
          </a>

        </nav>


        <div className="sidebar-bottom">

          <a href="#" className="nav-item">
            <span>⚙</span>
            Settings
          </a>

          <button
            className="nav-item logout"
            onClick={onLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* Main Content */}

      <main className="dashboard-main">

        {/* Top Bar */}

        <header className="topbar">

          <div>

            <p className="small-heading">
              ENTREPRENEUR DASHBOARD
            </p>

            <h1>
              Welcome back 👋
            </h1>

          </div>


          <div className="profile-mini">

            <div className="profile-avatar">
              E
            </div>

            <div>

              <strong>
                Entrepreneur
              </strong>

              <span>
                My Account
              </span>

            </div>

          </div>

        </header>


        {/* AI Banner */}

        <section className="ai-banner">

          <div className="ai-icon">
            ✦
          </div>


          <div className="ai-content">

            <span className="ai-label">
              ELIGIFY AI
            </span>

            <h2>
              Find the right government schemes for your business.
            </h2>

            <p>
              Our AI can analyze your profile and help you discover
              schemes you may be eligible for.
            </p>

          </div>


          <button
            className="ai-button"
            onClick={() => {
              document
                .querySelector('.chatbot-button')
                ?.click()
            }}
          >
            Ask Eligify AI →
          </button>

        </section>


        {/* Quick Actions */}

        <section className="section">

          <div className="section-header">

            <div>

              <h2>
                What would you like to do?
              </h2>

              <p>
                Choose an action to get started.
              </p>

            </div>

          </div>


          <div className="action-grid">

            <div className="action-card">

              <div className="action-icon blue">
                🔍
              </div>

              <h3>
                Find Government Schemes
              </h3>

              <p>
                Discover schemes matched to your business,
                location and eligibility.
              </p>

              <button
                onClick={() => {
                  document
                    .getElementById('profile')
                    ?.scrollIntoView({
                      behavior: 'smooth'
                    })
                }}
              >
                Find Schemes →
              </button>

            </div>


            <div className="action-card">

              <div className="action-icon green">
                👤
              </div>

              <h3>
                Complete My Profile
              </h3>

              <p>
                Add your business details so our AI can
                find more relevant opportunities.
              </p>

              <button
                onClick={() => {
                  document
                    .getElementById('profile')
                    ?.scrollIntoView({
                      behavior: 'smooth'
                    })
                }}
              >
                Complete Profile →
              </button>

            </div>


            <div className="action-card">

              <div className="action-icon purple">
                📄
              </div>

              <h3>
                Check Documents
              </h3>

              <p>
                Check the documents you may need before
                applying for a scheme.
              </p>

              <button
                onClick={() => {

                  const scheme =
                    matchedSchemes.length > 0
                      ? matchedSchemes[0]
                      : schemes[0]

                  if (scheme) {
                    handleDocuments(scheme)
                  }

                }}
              >
                Check Documents →
              </button>

            </div>

          </div>

        </section>


        {/* Profile */}

        <section
          className="scheme-section"
          id="profile"
        >

          <div className="section-header">

            <div>

              <h2>
                My Business Profile
              </h2>

              <p>
                Tell Eligify about your business to get better scheme matches.
              </p>

            </div>

          </div>


          <form
            className="profile-form"
            onSubmit={handleProfileSubmit}
          >

            <div className="profile-form-grid">

              <div className="form-group">

                <label>
                  Business Type
                </label>

                <select
                  name="businessType"
                  value={profile.businessType}
                  onChange={handleProfileChange}
                  required
                >

                  <option value="">
                    Select business type
                  </option>

                  <option value="manufacturing">
                    Manufacturing
                  </option>

                  <option value="services">
                    Services
                  </option>

                  <option value="trading">
                    Trading
                  </option>

                  <option value="agriculture">
                    Agriculture
                  </option>

                  <option value="technology">
                    Technology / Startup
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                  placeholder="e.g. Maharashtra"
                  required
                />

              </div>


              <div className="form-group">

                <label>
                  Gender
                </label>

                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  required
                >

                  <option value="">
                    Select gender
                  </option>

                  <option value="female">
                    Female
                  </option>

                  <option value="male">
                    Male
                  </option>

                  <option value="other">
                    Other
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Social Category
                </label>

                <select
                  name="category"
                  value={profile.category}
                  onChange={handleProfileChange}
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="general">
                    General
                  </option>

                  <option value="sc">
                    SC
                  </option>

                  <option value="st">
                    ST
                  </option>

                  <option value="obc">
                    OBC
                  </option>

                  <option value="minority">
                    Minority
                  </option>

                </select>

              </div>


              <div className="form-group">

                <label>
                  Business Stage
                </label>

                <select
                  name="businessStage"
                  value={profile.businessStage}
                  onChange={handleProfileChange}
                  required
                >

                  <option value="">
                    Select stage
                  </option>

                  <option value="idea">
                    Business Idea
                  </option>

                  <option value="new">
                    New Business
                  </option>

                  <option value="existing">
                    Existing Business
                  </option>

                  <option value="expansion">
                    Business Expansion
                  </option>

                </select>

              </div>

            </div>


            <button
              type="submit"
              className="primary-button"
              disabled={matching}
            >

              {matching
                ? 'Finding Schemes...'
                : profileSaved
                  ? 'Profile Saved ✓'
                  : 'Find My Schemes →'}

            </button>

          </form>

        </section>


        {/* AI Matches */}

        {matchedSchemes.length > 0 && (

          <section
            className="scheme-section"
            id="matches"
          >

            <div className="section-header">

              <div>

                <h2>
                  ✦ Your AI Matches
                </h2>

                <p>
                  Schemes matched using your business profile.
                </p>

              </div>


              <span className="scheme-count">
                {matchedSchemes.length} matches
              </span>

            </div>


            <div className="scheme-grid">

              {matchedSchemes.map((scheme) => {

                const percentage =
                  getMatchPercentage(
                    scheme.match_score
                  )

                const reasons =
                  getMatchReasons(scheme)


                return (

                  <div
                    className="scheme-card"
                    key={scheme.id}
                  >

                    <div className="scheme-card-top">

                      <div className="scheme-icon">
                        ✦
                      </div>

                      <span className="scheme-level">
                        {percentage}% Match
                      </span>

                    </div>


                    <h3>
                      {scheme.name}
                    </h3>


                    <p className="scheme-description">
                      {scheme.description}
                    </p>


                    <div className="scheme-info">

                      <span>
                        WHY THIS MATCHES
                      </span>

                      <div className="scheme-tags">

                        {reasons.map(
                          (reason, index) => (

                            <small key={index}>
                              ✓ {reason}
                            </small>

                          )
                        )}

                      </div>

                    </div>


                    <div className="scheme-info">

                      <span>
                        SUPPORT
                      </span>

                      <div className="scheme-tags">

                        {scheme.support_types.map(
                          (support, index) => (

                            <small key={index}>
                              {support}
                            </small>

                          )
                        )}

                      </div>

                    </div>


                    <div className="scheme-actions">

                      <a
                        className="scheme-link"
                        href={scheme.official_source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View official details →
                      </a>

                      <button
                        className="apply-button"
                        onClick={() => handleDocuments(scheme)}
                      >
                        Documents →
                      </button>

                      <a
                        className="apply-button"
                        href={scheme.official_source}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Apply Now →
                      </a>

                    </div>

                  </div>

                )

              })}

            </div>

          </section>

        )}


        {/* All Schemes */}

        <section
          className="scheme-section"
          id="schemes"
        >

          <div className="section-header">

            <div>

              <h2>
                All Government Schemes
              </h2>

              <p>
                Government schemes available through Eligify.
              </p>

            </div>


            <span className="scheme-count">
              {schemes.length} schemes
            </span>

          </div>


          {loading ? (

            <div className="empty-scheme">

              <div className="empty-icon">
                ✦
              </div>

              <h3>
                Loading schemes...
              </h3>

              <p>
                Please wait while we load government schemes.
              </p>

            </div>

          ) : (

            <div className="scheme-grid">

              {schemes.map((scheme) => (

                <div
                  className="scheme-card"
                  key={scheme.id}
                >

                  <div className="scheme-card-top">

                    <div className="scheme-icon">
                      ✦
                    </div>

                    <span className="scheme-level">
                      {scheme.level}
                    </span>

                  </div>


                  <h3>
                    {scheme.name}
                  </h3>


                  <p className="scheme-description">
                    {scheme.description}
                  </p>


                  <div className="scheme-info">

                    <span>
                      SUPPORT
                    </span>

                    <div className="scheme-tags">

                      {scheme.support_types.map(
                        (support, index) => (

                          <small key={index}>
                            {support}
                          </small>

                        )
                      )}

                    </div>

                  </div>


                  <div className="scheme-info">

                    <span>
                      SUITABLE FOR
                    </span>

                    <p>
                      {scheme.target_groups.join(' • ')}
                    </p>

                  </div>


                  <div className="scheme-actions">

                    <a
                      className="scheme-link"
                      href={scheme.official_source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View official details →
                    </a>

                    <button
                      className="apply-button"
                      onClick={() => handleDocuments(scheme)}
                    >
                      Documents →
                    </button>

                    <a
                      className="apply-button"
                      href={scheme.official_source}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Apply Now →
                    </a>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>


        {/* Documents */}

        <section
          className="scheme-section"
          id="documents"
        >

          <div className="section-header">

            <div>

              <h2>
                📄 Required Documents
              </h2>

              <p>
                Documents you may need before applying.
              </p>

            </div>

          </div>


          {selectedScheme ? (

            <div className="profile-form">

              <h3>
                {selectedScheme.name}
              </h3>

              <p className="scheme-description">
                Keep these documents ready before starting your application.
              </p>


              <div className="document-list">

                {(selectedScheme.documents || []).map(
                  (document, index) => (

                    <div
                      className="document-item"
                      key={index}
                    >

                      <span>
                        ✓
                      </span>

                      <p>
                        {document}
                      </p>

                    </div>

                  )
                )}

              </div>


              <a
                className="apply-button"
                href={selectedScheme.official_source}
                target="_blank"
                rel="noreferrer"
              >
                Go to Official Website →
              </a>

            </div>

          ) : (

            <div className="empty-scheme">

              <div className="empty-icon">
                📄
              </div>

              <h3>
                Select a scheme
              </h3>

              <p>
                Click “Documents” on any scheme to see its document checklist.
              </p>

            </div>

          )}

        </section>


        {/* Applications */}

        <section
          className="scheme-section"
          id="applications"
        >

          <div className="section-header">

            <div>

              <h2>
                📋 Applications
              </h2>

              <p>
                Track your government scheme applications here.
              </p>

            </div>

          </div>


          <div className="empty-scheme">

            <div className="empty-icon">
              📋
            </div>

            <h3>
              No applications yet
            </h3>

            <p>
              Once you start applying for a scheme, you can track it here.
            </p>

          </div>

        </section>

      </main>


      <AIChatbot />

    </div>

  )
}

export default Dashboard