interface CloudProps {
  src: string;
  size: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  opacity: number;
}

const Cloud = ({ src, size, left, top, duration, delay, opacity }: CloudProps) => {
  return (
    <img
      src={src}
      alt="cloud"
      className="absolute pointer-events-none animate-float"
      style={{
        width: `${size}px`,
        height: 'auto',
        left,
        top,
        opacity,
        animation: `float ${duration}s ease-in-out infinite ${delay}s`,
      }}
    />
  );
};

interface FloatingCloudsProps {
  density?: 'light' | 'medium' | 'heavy';
}

const FloatingClouds = ({ density = 'medium' }: FloatingCloudsProps) => {
  const cloudImages = [
    '/images/icons/cloud (1).png',
    '/images/icons/cloud (2).png',
    '/images/icons/cloud (3).png',
  ];

  // Cloud configurations based on density
  const cloudConfigs = {
    light: [
      { src: cloudImages[0], size: 80, left: '5%', top: '10%', duration: 8, delay: 0, opacity: 0.3 },
      { src: cloudImages[1], size: 100, left: '85%', top: '15%', duration: 10, delay: 2, opacity: 0.35 },
      { src: cloudImages[2], size: 70, left: '75%', top: '70%', duration: 9, delay: 4, opacity: 0.3 },
      { src: cloudImages[0], size: 90, left: '15%', top: '80%', duration: 11, delay: 1, opacity: 0.25 },
    ],
    medium: [
      { src: cloudImages[0], size: 100, left: '5%', top: '8%', duration: 8, delay: 0, opacity: 0.35 },
      { src: cloudImages[1], size: 120, left: '88%', top: '12%', duration: 10, delay: 2, opacity: 0.4 },
      { src: cloudImages[2], size: 80, left: '45%', top: '5%', duration: 9, delay: 3, opacity: 0.3 },
      { src: cloudImages[0], size: 90, left: '75%', top: '65%', duration: 11, delay: 4, opacity: 0.35 },
      { src: cloudImages[1], size: 110, left: '15%', top: '75%', duration: 12, delay: 1, opacity: 0.3 },
      { src: cloudImages[2], size: 85, left: '55%', top: '85%', duration: 10, delay: 5, opacity: 0.35 },
      { src: cloudImages[0], size: 75, left: '30%', top: '40%', duration: 9, delay: 2, opacity: 0.25 },
    ],
    heavy: [
      { src: cloudImages[0], size: 180, left: '5%', top: '5%', duration: 8, delay: 0, opacity: 0.4 },
      { src: cloudImages[1], size: 200, left: '90%', top: '8%', duration: 10, delay: 2, opacity: 0.45 },
      { src: cloudImages[2], size: 150, left: '40%', top: '3%', duration: 9, delay: 3, opacity: 0.35 },
      { src: cloudImages[0], size: 170, left: '70%', top: '15%', duration: 11, delay: 1, opacity: 0.4 },
      { src: cloudImages[1], size: 160, left: '25%', top: '20%', duration: 12, delay: 4, opacity: 0.35 },
      { src: cloudImages[2], size: 145, left: '55%', top: '25%', duration: 10, delay: 5, opacity: 0.3 },
      { src: cloudImages[0], size: 155, left: '15%', top: '45%', duration: 9, delay: 2, opacity: 0.35 },
      { src: cloudImages[1], size: 190, left: '80%', top: '50%', duration: 11, delay: 6, opacity: 0.4 },
      { src: cloudImages[2], size: 135, left: '45%', top: '55%', duration: 10, delay: 1, opacity: 0.3 },
      { src: cloudImages[0], size: 165, left: '10%', top: '70%', duration: 12, delay: 3, opacity: 0.35 },
      { src: cloudImages[1], size: 150, left: '70%', top: '75%', duration: 9, delay: 4, opacity: 0.35 },
      { src: cloudImages[2], size: 175, left: '50%', top: '80%', duration: 11, delay: 5, opacity: 0.4 },
      { src: cloudImages[0], size: 140, left: '30%', top: '85%', duration: 10, delay: 2, opacity: 0.3 },
      { src: cloudImages[1], size: 155, left: '85%', top: '90%', duration: 8, delay: 0, opacity: 0.35 },
    ],
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cloudConfigs[density].map((config, index) => (
        <Cloud key={index} {...config} />
      ))}
    </div>
  );
};

export default FloatingClouds;
