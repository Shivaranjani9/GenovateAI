import React, { useState, useEffect } from "react";
import "./AnalysisComponent.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";

const functionalities = [
  {
    id: 1,
    title: "Gene Expression Prediction",
    img: "/images/gene.jpg",
    description: "Analyze gene expression levels using AI-based models.",
    video: "/videos/gene.mp4",
    outputImage: "/images/gene-piechart.jpg",
  },
  {
    id: 2,
    title: "Lung Cancer Prediction",
    img: "/images/lung.jpg",
    description: "Predict lung cancer risk based on medical imaging data.",
    video: "/videos/lung.mp4",
    outputImage: "/images/lung-piechart.jpg",
  },
  {
    id: 3,
    title: "Variant Impact Assessment",
    img: "/images/variant.jpg",
    description: "Assess genetic variants' impact on biological functions.",
    video: "/videos/variant.mp4",
    outputImage: "/images/variant-piechart.jpg",
  },
  {
    id: 4,
    title: "Functional Annotation",
    img: "/images/annotation.jpg",
    description: "Annotate genes and proteins for biomedical research.",
    video: "/videos/annotation.mp4",
    outputImage: "/images/annotation-piechart.jpg",
  },
];

const AnalysisComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFunctionality, setSelectedFunctionality] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".analysis-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setAnimate(true);
        } else {
          setAnimate(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShow = (func) => {
    setSelectedFunctionality(func);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div id="analysis">
    <div className="analysis-section">
      <h2 className="analysis-title">Analysis</h2>
      <div className="container">
        <div className="row">
          {functionalities.map((func, index) => (
            <div
              key={func.id}
              className={`col-lg-6 col-md-6 mb-4 analysis-card-wrapper ${
                animate ? (index % 2 === 0 ? "slide-in-left" : "slide-in-right") : ""
              }`}
            >
              <div className="analysis-card" onClick={() => handleShow(func)}>
                <div className="analysis-image-container">
                  <img src={func.img} alt={func.title} className="analysis-image" />
                  <div className="analysis-title-overlay">
                    {func.title}
                    <span className="arrow-down">↓</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFunctionality && (
        <Modal show={showModal} onHide={handleClose} centered className="custom-modal modal-large">
          <Modal.Header closeButton>
            <Modal.Title>{selectedFunctionality.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="modal-content-wrapper">
              <div className="modal-video-section">
                <video
                  src={selectedFunctionality.video}
                  className="modal-video"
                  controls
                  onClick={(e) => e.target.requestFullscreen()}
                />
                <p className="modal-description">{selectedFunctionality.description}</p>
              </div>
              <div className="modal-form-section">
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload File:</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} />
                  </Form.Group>
                  {selectedFile && (
                    <>
                      {/* 🔹 Added Output Box */}
                      <div className="output-box">
                        <h5>Output Generated</h5>
                        <p>You have generated this output from this input.</p>
                      </div>

                      <Button variant="success" className="download-btn">
                        Download Output
                      </Button>

                      {/* 🔹 Pie Chart Image Below Output Box */}
                      <div className="chart-container">
                        <img
                          src={selectedFunctionality.outputImage}
                          alt="Pie Chart Output"
                          className="output-image"
                        />
                      </div>
                    </>
                  )}
                </Form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
    </div>
  );
};

export default AnalysisComponent;
