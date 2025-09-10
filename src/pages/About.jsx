function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About GDG Gwalior
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Empowering developers, building community, and shaping the future of
            technology
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Welcome to Google Developer Groups Gwalior
          </h2>

          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              GDG Gwalior is a community-driven group focused on Google
              technologies and software development. We are part of the global
              GDG program supported by Google, bringing together students,
              developers, designers, and tech enthusiasts from across the
              region.
            </p>

            <p>
              Our mission is to create a collaborative environment where
              developers can learn, share knowledge, and grow together. We
              believe in the power of community to drive innovation and create
              opportunities for everyone interested in technology.
            </p>

            <p>
              Based in the historic city of Gwalior, we strive to bridge the gap
              between academic learning and industry requirements, helping
              students and professionals alike to stay updated with the latest
              trends in technology.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                🚀 Workshops & Events
              </h3>
              <p className="text-gray-700">
                Regular hands-on workshops on Android Development, Web
                Technologies, Cloud Computing, Machine Learning, and other
                Google technologies.
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                🤝 Community Building
              </h3>
              <p className="text-gray-700">
                Connect with like-minded individuals, industry experts, and
                potential collaborators through our networking events and
                meetups.
              </p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                🎯 Skill Development
              </h3>
              <p className="text-gray-700">
                Learn new skills, work on real-world projects, and get guidance
                from experienced developers and Google experts.
              </p>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                🏆 Hackathons & Competitions
              </h3>
              <p className="text-gray-700">
                Participate in coding competitions, hackathons, and challenges
                to test your skills and win exciting prizes.
              </p>
            </div>
          </div>
        </div>

        {/* Why Join Us Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Why Join GDG Gwalior?
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-4">🌟</span>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Learn Cutting-edge Technologies
                </h4>
                <p className="text-gray-700">
                  Stay updated with the latest Google technologies and
                  development practices
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-4">👥</span>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Network with Experts
                </h4>
                <p className="text-gray-700">
                  Connect with industry professionals, Google Developers
                  Experts, and mentors
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-4">💼</span>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Career Opportunities
                </h4>
                <p className="text-gray-700">
                  Gain exposure to potential internships, job opportunities, and
                  collaborations
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-4">🌍</span>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Global Community
                </h4>
                <p className="text-gray-700">
                  Become part of a worldwide network of developers and tech
                  enthusiasts
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to Join Our Community?
          </h3>
          <p className="text-gray-700 mb-6">
            Whether you're a student, professional, or just passionate about
            technology, there's a place for you in GDG Gwalior.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
