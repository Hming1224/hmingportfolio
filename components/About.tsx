
export default function About() {
  return (
    <section id="about" className="p-6 min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-4xl font-bold mb-8">About</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start max-w-4xl mx-auto">
        {/* Profile Photo */}
        <div className="md:w-1/3 flex justify-center p-4">
          {/* Placeholder for Profile Photo */}
          <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-center">
            [Profile Photo]
          </div>
        </div>

        {/* Text and Buttons */}
        <div className="md:w-2/3 p-4 text-center md:text-left">
          <p className="text-lg leading-relaxed mb-6">
            Hello, I&apos;m Brian Huang, a UX/UI Designer with over 2 years of project experience, specializing in interactive experience design. My passion lies in crafting user-centered solutions that are both intuitive and visually appealing. I thrive on translating complex ideas into engaging digital experiences.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Throughout my career, I&apos;ve honed my skills in various design software and methodologies, consistently aiming to deliver innovative and impactful designs. I believe in a collaborative approach, working closely with stakeholders to ensure designs meet both user needs and business objectives.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a
              href="/黃宣銘_中文履歷.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Resume
            </a>
            <a
              href="https://www.linkedin.com/in/brianhuang/" // Replace with actual LinkedIn profile
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-black text-black rounded-md hover:bg-gray-100 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
