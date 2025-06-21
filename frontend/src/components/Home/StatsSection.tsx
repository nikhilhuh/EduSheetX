import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import React from "react";

export const StatsSection: React.FC<{
  siteStats: {
    totalStudents: number;
    totalTestsTaken: number;
    totalQuestionsAnswered: number;
    testsAvailable: number;
  };
}> = ({ siteStats }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="mt-10 px-6 text-center">
      <h2 className="text-2xl mobile-l:text-3xl laptop-sm:text-4xl font-semibold mb-4">
        EduSheetX Impact
      </h2>

      <div className="grid grid-cols-1 tablet:grid-cols-4 gap-8 mx-auto">
        <StatCard
          label="Total Students Helped"
          value={siteStats?.totalStudents || 0}
          color="text-blue-600"
          inView={inView}
        />
        <StatCard
          label="Tests Taken"
          value={siteStats?.totalTestsTaken || 0}
          color="text-green-600"
          inView={inView}
        />
        <StatCard
          label="Questions Answered"
          value={siteStats?.totalQuestionsAnswered || 0}
          color="text-purple-600"
          inView={inView}
        />
        <StatCard
          label="Tests Available"
          value={siteStats?.testsAvailable || 0}
          color="text-purple-600"
          inView={inView}
        />
      </div>
    </section>
  );
};

const StatCard = ({
  label,
  value,
  color,
  inView,
}: {
  label: string;
  value: number;
  color: string;
  inView: boolean;
}) => (
  <div className="flex flex-col items-center bg-gray-100 shadow p-4 rounded">
    <span className={`text-5xl font-bold ${color}`}>
      {inView ? <CountUp end={value} duration={2.5} separator="," /> : 0}
    </span>
    <p className="mt-2 text-lg font-medium text-gray-700">{label}</p>
  </div>
);
