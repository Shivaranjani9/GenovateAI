import React from "react";
import "./AboutUsComponent.css"; // Import custom styles
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded

const AboutUsComponent = () => {
  const teamMembers = [
    { id: 1, name: "John Doe", role: "Web Developer", img: "/images/person1.png" },
    { id: 2, name: "Jane Smith", role: "UI/UX Designer", img: "/images/person2.jpg" },
    { id: 3, name: "Michael Brown", role: "Backend Developer", img: "/images/person3.jpg" },
    { id: 4, name: "Sarah Lee", role: "Project Manager", img: "/images/person4.jpg" },
    { id: 5, name: "David Wilson", role: "Software Engineer", img: "/images/person5.jpg" },
    { id: 6, name: "Emily Johnson", role: "Data Scientist", img: "/images/person5.jpg" }, // Top image
  ];

  return (
    <div id="about" className="about-section">
      {/* Background Overlay */}
      <div className="about-overlay"></div>

      <h2 className="about-title">
        <span className="about">About</span> <span className="us">Us</span>
      </h2>

      {/* Quote Section with Background Highlight */}
      <div className="about-quote-container">
        <p className="about-quote">"Together, we innovate and create the future of AI-powered healthcare."</p>
      </div>

      <div className="container">
        {/* Top Image (Centered at the Top) */}
        <div className="row justify-content-center">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="flip-card top-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img src={teamMembers[5].img} alt={teamMembers[5].name} className="team-image" />
                </div>
                <div className="flip-card-back">
                  <h4>{teamMembers[5].name}</h4>
                  <p>{teamMembers[5].role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 5 Images in a Single Row (Wider and Aligned) */}
        <div className="row justify-content-center align-items-center">
          {teamMembers.slice(0, 5).map((member) => (
            <div key={member.id} className="col-lg-2 col-md-4 col-sm-6 d-flex justify-content-center">
              <div className="flip-card wide-card"> {/* Wider bottom images */}
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={member.img} alt={member.name} className="team-image" />
                  </div>
                  <div className="flip-card-back">
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsComponent;
