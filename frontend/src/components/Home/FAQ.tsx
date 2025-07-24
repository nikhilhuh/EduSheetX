import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faq: FAQItem[] = [
  {
    question: "What is this platform all about?",
    answer:
      "This platform is an online testing system designed specifically for Class 10 students. It offers subject-wise and topic-wise tests to help you prepare better for your board exams.",
  },
  {
    question: "How are the tests structured?",
    answer:
      "Each test is designed to be:\n1) Topic-specific for focused practice\n2) Timed, to help you build exam stamina\n3) Includes Multiple Choice Questions (MCQs) similar to board exam formats",
  },
  {
    question: "Are the questions board-level?",
    answer:
      "Yes, all questions are carefully curated or generated to match the difficulty level and syllabus of Class 10 board exams (CBSE/ICSE/State boards).",
  },
  {
    question: "Do I need to sign up to take tests?",
    answer:
      "You can take tests as a guest, but signing up gives you access to track your progress, save your results, and get a chance to appear in the leaderboard of students.",
  },
  {
    question: "Can I take the same test multiple times?",
    answer:
      "No, you cannot retake any test. You can only view your result once you have given any test.",
  },
  {
    question: "Is there a time limit for each test?",
    answer:
      "Most tests have a pre-set time limit, based on the number of questions. The timer will be visible during the test.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes! Currently, all features and tests are completely free to use.",
  },
  {
    question: "Can I use this on mobile devices?",
    answer:
      "Absolutely! The platform is mobile-friendly and works well on any modern browser.",
  },
  {
    question: "Is there a leaderboard or ranking system?",
    answer:
      "Yes! If you’re logged in, your scores can be compared on a leaderboard with other students (if this feature is enabled).",
  },
  {
    question: "Will more subjects or features be added in the future?",
    answer:
      "Yes, we’re constantly working to improve the platform. More subjects, mock board exams, and AI-based analysis features will be rolled out soon.",
  },
];

const FAQ: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<Record<number, boolean>>({});
  const [visibleCount, setVisibleCount] = React.useState<number>(5);

  const toggle = (index: number) => {
    setIsOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, faq.length));
  };

  const handleViewLess = () => {
    setVisibleCount(5);
    setIsOpen({});
  };

  return (
    <div className="max-w-6xl w-full mx-auto px-4 py-8 mt-4">
      <div className="w-full">
        <h2
          className="text-2xl mobile-l::text-3xl laptop-sm:text-4xl font-bold mb-6 text-center"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Frequently Asked Questions
        </h2>
        {faq.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className="mb-4 border shadow-sm w-full border-blue-300"
            data-aos="zoom-in"
            data-aos-delay={index > visibleCount ? `${index * 100}` : `${index - visibleCount * 100}`}
            data-aos-duration="700"
          >
            <button
              className="text-left px-4 py-3 duration-200 font-medium flex items-center justify-between w-full bg-blue-100/80 hover:bg-blue-200/80 hover:cursor-pointer transition-all"
              onClick={() => toggle(index)}
            >
              <span>{item.question}</span>
              {isOpen[index] ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            {isOpen[index] && (
              <div className="px-4 py-3 text-gray-700 whitespace-pre-line bg-blue-50/80">
                {item.answer}
              </div>
            )}
          </div>
        ))}

        {/* View More / View Less Button */}
        <div
          data-aos="fade-up"
          data-aos-duration={`${visibleCount} * 100`}
          className="text-center mt-6"
        >
          {visibleCount < faq.length ? (
            <button
              onClick={handleViewMore}
              className="text-blue-600 font-semibold px-4 py-2 rounded hover:underline hover:cursor-pointer"
            >
              View More
            </button>
          ) : faq.length > 5 ? (
            <button
              onClick={handleViewLess}
              className="text-blue-600 font-semibold px-4 py-2 rounded hover:underline hover:cursor-pointer"
            >
              View Less
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
