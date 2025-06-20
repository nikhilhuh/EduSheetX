import React from "react";
import InstructionsImg from "../../assets/images/instructions.png";

export const Instructions: React.FC = () => {
  return (
    <section className="p-6 text-gray-800">
      <div className="max-w-6xl mx-auto grid laptop-sm:grid-cols-2 gap-12 items-center">
        {/* Left Text Content */}
        <div>
          <h2 className="text-3xl laptop-sm:text-4xl font-semibold mb-4">
            Instructions
          </h2>
          <ul className="list-disc list-outside space-y-2 text-lg laptop-sm:text-xl max-w-4xl px-8">
            <li>
              Click on "Start Practicing" and then select a Subject and then
              Topic of your choice.
            </li>
            <li>
              Select the test you want to give & click on "Start Test" to start
              the test
            </li>
            <li>
              The number of questions in the test will be written on the details
              of Test only.
            </li>
            <li>
              The time limit of each test will be different , which will be
              given in the details of Test itself.
            </li>
            <li>The Timer will start as soon as you start the test.</li>
            <li>
              The timer will be running at the top of screen above the questions
              , if the time is over the test will be submitted automatically
              irrespective of questions complete.
            </li>
            <li>
              For every question there is only one correct option out of the
              four given options.
            </li>
            <li>
              Each question carries one mark. There is no negative marking for
              incorrect choice.
            </li>
            <li>
              For moving to the next question, click on "Next" at the bottom of
              the screen.
            </li>
            <li>Questions can be answered in any order.</li>
            <li>
              For moving to a previous question click on "Prev" at the bottom of
              the screen.
            </li>
            <li>
              Students can make changes in their choice of answers before
              clicking the "SUBMIT" button.
            </li>
            <li>
              After completing all the questions, click on "Submit" button.
            </li>
            <li>
              Your Result will be displayed on the screen .
            </li>
          </ul>
        </div>
        {/* right illustrations */}
        <div className="hidden laptop-sm:flex">
          <img
            src={InstructionsImg}
            alt="Instructions Illustration"
            className="w-full max-w-sm mx-auto"
          />
        </div>
      </div>
    </section>
  );
};
