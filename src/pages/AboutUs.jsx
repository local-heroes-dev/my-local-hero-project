import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const AboutUs = () => {
  const developers = [
    {
      id: 1,
      name: "Abdillahi Mohamoud",
      role: "Frontend Developer",
      email: "abdillahilabasuul@gmail.com",
      github: "https://github.com/abdillahi485",
      linkedin:
        "https://www.linkedin.com/in/abdillahi-mohamoud-mohamed-895719253/",
      bio: "Passionate about building meaningful applications that connect communities and celebrate local heroes.",
      image: "/img/image1.jpg",
    },
    {
      id: 2,
      name: "Maria Yusuf",
      role: "Frontend Developer",
      email: "yusufmaria000@gmail.com",
      github: "https://github.com/Mariayusuf12",
      linkedin: "https://linkedin.com/in/Mariayusuf12",
      bio: "Creating beautiful and intuitive user experiences that make technology accessible to everyone.",
      image: "/img/image2.jpg",
    },
    {
      id: 3,
      name: "Abdifatah Omer",
      role: "Frontend Developer",
      email: "abdifatahumer@gmail.com",
      github: "https://github.com/abdifatah436",
      linkedin: "https://linkedin.com/in/michael-chen",
      bio: "Building responsive and user-friendly web applications that enhance user experience.",
      image: "/img/image3.jpg",
    },
    {
      id: 4,
      name: "Abdirahman Ali",
      role: "Frontend Developer",
      email: "sabrihse1@hotmail.com",
      github: "https://github.com/Abdulrahman-Midraara",
      linkedin: "https://linkedin.com/in/emily-rodriguez",
      bio: "Creating real world applications that make a difference.",
      image: "/img/image4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a passionate team of developers dedicated to building
            platforms that celebrate community heroes and bring people together.
            Our mission is to recognize the everyday people making extraordinary
            differences in their communities.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Celebrate Heroes
              </h3>
              <p className="text-gray-600">
                Recognize and celebrate the everyday people making extraordinary
                differences in their communities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Build Community
              </h3>
              <p className="text-gray-600">
                Connect people through shared stories of inspiration and create
                stronger, more supportive communities.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Inspire Action
              </h3>
              <p className="text-gray-600">
                Motivate others to make positive changes in their own
                communities through the power of example.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {developers.map((developer) => (
              <div
                key={developer.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Profile Image */}
                <div className="pt-6 flex items-center justify-center">
                  <img
                    src={developer.image}
                    alt={developer.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-40 h-40 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg"
                    style={{ display: "none" }}
                  >
                    {developer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                {/* Developer Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {developer.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-3">
                    {developer.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{developer.bio}</p>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FaEnvelope className="w-4 h-4 mr-2 text-orange-500" />
                      <span className="truncate">{developer.email}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex space-x-3">
                    <a
                      href={developer.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <FaGithub className="w-5 h-5" />
                    </a>
                    <a
                      href={developer.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions about our platform or want to collaborate? We'd love
            to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/local-heroes-dev/my-local-hero-project"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors font-medium"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
