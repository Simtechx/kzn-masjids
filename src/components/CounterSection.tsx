
import React, { useEffect, useState, useRef } from 'react';

interface FlipDigitProps {
  digit: number;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          {digit}
        </div>
      </div>
    </div>
  );
};

interface FlipCounterProps {
  end: number;
  label: string;
  delay?: number;
}

const FlipCounter: React.FC<FlipCounterProps> = ({ end, label, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const countingDone = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countingDone.current) {
          countingDone.current = true;
          
          // Apply delay before starting counter
          setTimeout(() => {
            let currentCount = 0;
            const duration = 2000; // 2 seconds
            const step = Math.ceil(end / (duration / 50)); // Update every 50ms
            
            const timer = setInterval(() => {
              currentCount += step;
              if (currentCount > end) {
                currentCount = end;
                clearInterval(timer);
              }
              setCount(currentCount);
            }, 50);
            
            return () => clearInterval(timer);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, delay]);

  // Convert number to array of digits
  const digits = count.toString().split('').map(Number);

  return (
    <div 
      className="flex flex-col items-center transform transition-all duration-700 hover:scale-105" 
      ref={counterRef}
    >
      <div className="flip-counter-container">
        {digits.map((digit, index) => (
          <FlipDigit key={index} digit={digit} />
        ))}
      </div>
      <div className="text-lg md:text-xl text-white font-medium mt-3">{label}</div>
    </div>
  );
};

const CounterSection = () => {
  // Updated data for the counters based on the provided table
  const regionsCount = 5;
  const masjidsCount = 174;
  const musallasCount = 135;
  const totalCount = 309;

  return (
    <section className="py-8 md:py-16 px-4 relative bg-[#051b16] overflow-hidden">
      {/* Background Image as Watermark with darker overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 z-0"
        style={{ 
          backgroundImage: 'url("/lovable-uploads/3d6cd80a-4e05-4ded-ba80-fa70d25845ce.png")',
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Making the overlay darker
        }}
      ></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
            KWA-ZULU NATAL MASJIDS AND MUSALLAS
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Discover the growing presence of masjids and musallahs throughout the province.
          </p>
          <div className="w-24 h-1 bg-islamic-gold mx-auto mt-6"></div>
        </div>
        
        {/* Mobile: 2x2 grid, Desktop: 1x4 grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
          <div className="p-3 md:p-6 flex flex-col items-center">
            <FlipCounter 
              end={regionsCount} 
              label="Regions" 
              delay={0}
            />
          </div>
          
          <div className="p-3 md:p-6 flex flex-col items-center">
            <FlipCounter 
              end={masjidsCount} 
              label="Masjids" 
              delay={200}
            />
          </div>
          
          <div className="p-3 md:p-6 flex flex-col items-center">
            <FlipCounter 
              end={musallasCount} 
              label="Musallas" 
              delay={400}
            />
          </div>
          
          <div className="p-3 md:p-6 flex flex-col items-center">
            <FlipCounter 
              end={totalCount} 
              label="Total" 
              delay={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
