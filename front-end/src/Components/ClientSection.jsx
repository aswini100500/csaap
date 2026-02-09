const ClientSection = () => {
  return (
    <>
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-250px * 7));
            }
          }
          
          .slider {
            height: 150px;
            margin: auto;
            overflow: hidden;
            position: relative;
            width: 100%;
          }
          
          .slider::before,
          .slider::after {
            content: "";
            height: 100%;
            position: absolute;
            width: 50px;
            z-index: 2;
          }
          
          .slider::after {
            right: 0;
            top: 0;
            transform: rotateZ(180deg);
          }
          
          .slider-track {
            animation: scroll 40s linear infinite;
            display: flex;
            width: calc(250px * 14);
          }
          
          .slide {
            height: 100px;
            width: 250px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 10px;
          }
          
          .slide img {
            max-height: 80px;
            max-width: 180px;
            object-fit: contain;
            transition: transform 0.3s ease;
          }
          
          .slide img:hover {
            transform: scale(1.05);
          }
          
          .client-section {
            background: linear-gradient(to bottom, #f8fafc, #e2e8f0);
            padding: 4rem 0;
          }
        `}
      </style>
      
      <section id="clients" className="client-section">
        <h2 className="text-center text-3xl font-bold mb-12">Trusted by <span className="text-blue-700">10 Million+</span> Merchants Worldwide</h2>
        
        <div className="slider">
          <div className="slider-track">
            {/* First set of logos */}
            <div className="slide">
              <img src="client5.png" alt="Client 1" />
            </div>
            <div className="slide">
              <img src="vmart.png" alt="Client 2" />
            </div>
            <div className="slide">
              <img src="patanjali.png" alt="Client 3" />
            </div>
            <div className="slide">
              <img src="samrvir.png" alt="Client 4" />
            </div>
            <div className="slide">
              <img src="bikaji.png" alt="Client 5" />
            </div>
            <div className="slide">
              <img src="rspl.png" alt="Client 6" />
            </div>
            <div className="slide">
              <img src="shiv.png" alt="Client 7" />
            </div>
            <div className="slide">
              <img src="alkem.png" alt="Client 8" />
            </div>
            <div className="slide">
              <img src="7hills.png" alt="Client 9" />
            </div>
            <div className="slide">
              <img src="ananyaHerbal.png" alt="Client 10" />
            </div>
            <div className="slide">
              <img src="shriram.png" alt="Client 11" />
            </div>
            <div className="slide">
              <img src="starus.png" alt="Client 12" />
            </div>
            <div className="slide">
              <img src="goodyr.png" alt="Client 13" />
            </div>
            
            {/* Duplicate set for seamless looping */}
            <div className="slide">
              <img src="client5.png" alt="Client 1" />
            </div>
            <div className="slide">
              <img src="vmart.png" alt="Client 2" />
            </div>
            <div className="slide">
              <img src="patanjali.png" alt="Client 3" />
            </div>
            <div className="slide">
              <img src="samrvir.png" alt="Client 4" />
            </div>
            <div className="slide">
              <img src="bikaji.png" alt="Client 5" />
            </div>
            <div className="slide">
              <img src="rspl.png" alt="Client 6" />
            </div>
            <div className="slide">
              <img src="shiv.png" alt="Client 7" />
            </div>
            <div className="slide">
              <img src="alkem.png" alt="Client 8" />
            </div>
            <div className="slide">
              <img src="7hills.png" alt="Client 9" />
            </div>
            <div className="slide">
              <img src="ananyaHerbal.png" alt="Client 10" />
            </div>
            <div className="slide">
              <img src="shriram.png" alt="Client 11" />
            </div>
            <div className="slide">
              <img src="starus.png" alt="Client 12" />
            </div>
            <div className="slide">
              <img src="goodyr.png" alt="Client 13" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientSection;