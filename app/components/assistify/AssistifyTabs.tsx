
import React from "react";
import {
  FileText,
  CalendarDays,
  UserPlus,
  GraduationCap,
  Clock,
  Replace,
  BookUser,
  Gavel,
  ShieldCheck,
  Ban,
  Scale,
  ClipboardList,
  BarChart2,
  FileWarning,
  Repeat,
  BookCopy,
  Award,
  Star,
  Trophy,
  AlertTriangle,
  InfoIcon,
  CheckCircleIcon,
  ChevronRightIcon,
} from "lucide-react";

/* ===== SHARED COMPONENTS ===== */

function TabContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-4 md:p-8 h-full overflow-y-auto"
      style={{ background: "#0a0e1a" }}
    >
      <div className="max-w-4xl mx-auto space-y-6">{children}</div>
    </div>
  );
}

function SectionCard({
  icon,
  title,
  color,
  children,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden animate-fadeIn"
      style={{
        animationDelay: `${delay}s`,
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${color}15`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.2)`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{
          borderBottom: `1px solid ${color}12`,
          background: `${color}06`,
        }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            background: `${color}12`,
            border: `1px solid ${color}20`,
          }}
        >
          {icon}
        </div>
        <h3
          className="font-bold"
          style={{ fontSize: "16px", color: "#f3f4f6" }}
        >
          {title}
        </h3>
      </div>
      {/* Body */}
      <div
        className="px-5 py-5 space-y-4"
        style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.7" }}
      >
        {children}
      </div>
    </div>
  );
}

function StyledList({ items, color = "#3b82f6" }: { items: React.ReactNode[]; color?: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <ChevronRightIcon
            className="w-3.5 h-3.5 shrink-0 mt-1.5"
            style={{ color }}
          />
          <span style={{ fontSize: "13.5px", color: "#d1d5db" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({
  icon,
  color,
  children,
}: {
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl px-4 py-3"
      style={{
        background: `${color}08`,
        borderLeft: `3px solid ${color}`,
        borderRight: `1px solid ${color}12`,
        borderTop: `1px solid ${color}12`,
        borderBottom: `1px solid ${color}12`,
      }}
    >
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div style={{ fontSize: "13px", lineHeight: "1.65", color: "#d1d5db" }}>
        {children}
      </div>
    </div>
  );
}

function StyledTable({
  headers,
  rows,
  accentColor = "#3b82f6",
}: {
  headers: string[];
  rows: (string | number)[][];
  accentColor?: string;
}) {
  return (
    <div
      className="overflow-x-auto rounded-xl"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <table className="min-w-full">
        <thead>
          <tr style={{ background: `${accentColor}0a` }}>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left font-bold uppercase tracking-wider"
                style={{
                  fontSize: "10.5px",
                  color: accentColor,
                  borderBottom: `1px solid ${accentColor}15`,
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-colors duration-200"
              style={{
                background:
                  rowIndex % 2 === 0
                    ? "rgba(255,255,255,0.01)"
                    : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  rowIndex % 2 === 0
                    ? "rgba(255,255,255,0.01)"
                    : "transparent";
              }}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-3 font-medium"
                  style={{
                    fontSize: "13px",
                    color: cellIndex === 0 ? "#e5e7eb" : "#9ca3af",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-2 animate-fadeIn">
      <h2
        className="font-extrabold tracking-tight"
        style={{
          fontSize: "clamp(24px, 3vw, 32px)",
          background: "linear-gradient(135deg, #f3f4f6, #9ca3af)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

/* ===== ACADEMIC REGULATIONS ===== */
export function AcademicRegulationsTab() {
  return (
    <TabContainer>
      <PageTitle>Academic Regulations</PageTitle>

      <SectionCard
        icon={<FileText className="w-4 h-4" style={{ color: "#3b82f6" }} />}
        title="Scope and Commencement"
        color="#3b82f6"
        delay={0.05}
      >
        <p>
          These rules, titled{" "}
          <strong style={{ color: "#e5e7eb" }}>
            &quot;PAF-IAST Bachelors Academic Rules 2021,&quot;
          </strong>{" "}
          are effective from the date of approval by the Board of Governors and
          apply to all undergraduate programs.
        </p>
      </SectionCard>

      <SectionCard
        icon={<BookUser className="w-4 h-4" style={{ color: "#8b5cf6" }} />}
        title="Definitions"
        color="#8b5cf6"
        delay={0.1}
      >
        <StyledList
          color="#8b5cf6"
          items={[
            <>
              <strong style={{ color: "#e5e7eb" }}>Academic Year:</strong> Two
              regular semesters (Fall, Spring) and an optional Summer semester.
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>Credit Hour:</strong> One
              hour of theory or three hours of lab work per week.
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>CGPA:</strong> Cumulative
              Grade Point Average, the weighted average of grades from all
              semesters.
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>GPA:</strong> Grade Point
              Average for a single semester.
            </>,
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<CalendarDays className="w-4 h-4" style={{ color: "#ec4899" }} />}
        title="Academic Calendar"
        color="#ec4899"
        delay={0.15}
      >
        <StyledList
          color="#ec4899"
          items={[
            <>
              <strong style={{ color: "#e5e7eb" }}>Fall Semester:</strong> 18
              weeks (Sept/Oct start).
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>Spring Semester:</strong> 18
              weeks (Feb/Mar start).
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>Summer Semester:</strong> 9
              weeks (optional).
            </>,
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<UserPlus className="w-4 h-4" style={{ color: "#10b981" }} />}
        title="Admission"
        color="#10b981"
        delay={0.2}
      >
        <p>
          Admission is based on merit, determined by tests and prior academic
          records. Admission can be canceled for document forgery, disciplinary
          issues, or non-payment of dues.
        </p>
      </SectionCard>

      <SectionCard
        icon={<Clock className="w-4 h-4" style={{ color: "#f59e0b" }} />}
        title="Credit & Semester System"
        color="#f59e0b"
        delay={0.25}
      >
        <StyledList
          color="#f59e0b"
          items={[
            <>
              A BS degree requires a minimum of{" "}
              <strong style={{ color: "#e5e7eb" }}>130 credit hours</strong>.
            </>,
            <>
              Standard semester load:{" "}
              <strong style={{ color: "#e5e7eb" }}>12-18 credit hours</strong>{" "}
              (up to 21 for CGPA ≥ 3.50).
            </>,
            <>
              A maximum of{" "}
              <strong style={{ color: "#e5e7eb" }}>two semesters</strong> can be
              &quot;frozen&quot; during the degree program.
            </>,
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<Replace className="w-4 h-4" style={{ color: "#3b82f6" }} />}
        title="Course Registration & Changes"
        color="#3b82f6"
        delay={0.3}
      >
        <StyledList
          color="#3b82f6"
          items={[
            "Course registration is mandatory at the start of each semester.",
            <>
              Courses can be added or dropped within the{" "}
              <strong style={{ color: "#e5e7eb" }}>first 7 days</strong>.
            </>,
            <>
              Withdrawal (&apos;W&apos; grade) is allowed within the{" "}
              <strong style={{ color: "#e5e7eb" }}>first 10 weeks</strong>.
            </>,
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<GraduationCap className="w-4 h-4" style={{ color: "#8b5cf6" }} />}
        title="Graduation Requirements"
        color="#8b5cf6"
        delay={0.35}
      >
        <StyledList
          color="#8b5cf6"
          items={[
            "Complete all required credit hours (130+).",
            <>
              Achieve a minimum CGPA of{" "}
              <strong style={{ color: "#e5e7eb" }}>2.00</strong>.
            </>,
            "Complete the degree within the maximum duration (7 years for a 4-year degree).",
          ]}
        />
        <InfoBox
          icon={
            <AlertTriangle
              className="w-4 h-4"
              style={{ color: "#8b5cf6" }}
            />
          }
          color="#8b5cf6"
        >
          <strong style={{ color: "#e5e7eb" }}>Attendance Requirement:</strong> A
          minimum of <strong style={{ color: "#8b5cf6" }}>75% attendance</strong>{" "}
          is mandatory to be eligible for final exams. An &apos;F&apos; grade
          will be awarded for attendance below 65%.
        </InfoBox>
      </SectionCard>
    </TabContainer>
  );
}

/* ===== CODE OF CONDUCT ===== */
export function CodeOfConductTab() {
  return (
    <TabContainer>
      <PageTitle>Code of Conduct</PageTitle>

      <SectionCard
        icon={<Gavel className="w-4 h-4" style={{ color: "#ec4899" }} />}
        title="General Rules"
        color="#ec4899"
        delay={0.05}
      >
        <p>
          Students must maintain discipline, show respect to all members of the
          Institute community, and adhere strictly to all rules and regulations
          of PAF-IAST.
        </p>
      </SectionCard>

      <SectionCard
        icon={<ShieldCheck className="w-4 h-4" style={{ color: "#10b981" }} />}
        title="Student Expectations"
        color="#10b981"
        delay={0.1}
      >
        <StyledList
          color="#10b981"
          items={[
            "Uphold the Institute's mission and values.",
            "Practice academic honesty and integrity.",
            "Respect the rights and property of others.",
            "Refrain from activities that disrupt the academic environment.",
            "Contribute positively to the community.",
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<Ban className="w-4 h-4" style={{ color: "#ef4444" }} />}
        title="Acts of Indiscipline and Misconduct"
        color="#ef4444"
        delay={0.15}
      >
        <p style={{ marginBottom: "8px" }}>The following are strictly prohibited:</p>
        <StyledList
          color="#ef4444"
          items={[
            "Academic dishonesty (cheating, plagiarism).",
            "Disruption of teaching or administrative activities.",
            "Harassment, abuse, or intimidation.",
            "Theft or damage to property.",
            "Forgery or misuse of Institute documents.",
            "Possession of illegal drugs, alcohol, or weapons.",
            "Violation of examination rules.",
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<Scale className="w-4 h-4" style={{ color: "#f59e0b" }} />}
        title="Sanctions for Indiscipline"
        color="#f59e0b"
        delay={0.2}
      >
        <p>
          Penalties are imposed by the Campus Disciplinary Committee (CDC) based
          on the severity of the offense:
        </p>
        <StyledList
          color="#f59e0b"
          items={[
            <>
              <strong style={{ color: "#f59e0b" }}>Warning:</strong> A formal
              written reprimand.
            </>,
            <>
              <strong style={{ color: "#f59e0b" }}>Probation:</strong> A period
              of observation.
            </>,
            <>
              <strong style={{ color: "#ef4444" }}>Suspension:</strong> Temporary
              removal from the Institute.
            </>,
            <>
              <strong style={{ color: "#ef4444" }}>Expulsion:</strong> Permanent
              removal from the Institute.
            </>,
            <>
              <strong style={{ color: "#ef4444" }}>Cancellation of Degree:</strong>{" "}
              For severe fraud discovered post-graduation.
            </>,
          ]}
        />
      </SectionCard>
    </TabContainer>
  );
}

/* ===== EXAMINATION POLICY ===== */
export function ExaminationPolicyTab() {
  const gradingData = [
    ["A", "4.00", "85-100"],
    ["A-", "3.67", "80-84"],
    ["B+", "3.33", "75-79"],
    ["B", "3.00", "70-74"],
    ["B-", "2.67", "65-69"],
    ["C+", "2.33", "60-64"],
    ["C", "2.00", "55-59"],
    ["D", "1.00", "50-54"],
    ["F", "0.00", "Below 50"],
    ["W", "—", "Withdrawal"],
    ["I", "—", "Incomplete"],
  ];

  return (
    <TabContainer>
      <PageTitle>Examination Policy</PageTitle>

      <SectionCard
        icon={<ClipboardList className="w-4 h-4" style={{ color: "#3b82f6" }} />}
        title="Grading System"
        color="#3b82f6"
        delay={0.05}
      >
        <p>
          Student performance is evaluated using letter grades, each with a
          corresponding Grade Point value.
        </p>
        <StyledTable
          accentColor="#3b82f6"
          headers={["Grade", "Points", "Marks (%)"]}
          rows={gradingData}
        />
      </SectionCard>

      <SectionCard
        icon={<BarChart2 className="w-4 h-4" style={{ color: "#8b5cf6" }} />}
        title="Academic Standing"
        color="#8b5cf6"
        delay={0.1}
      >
        <StyledList
          color="#8b5cf6"
          items={[
            <>
              A minimum CGPA of{" "}
              <strong style={{ color: "#e5e7eb" }}>2.00</strong> is required for
              graduation.
            </>,
            <>
              Students with a CGPA below 2.00 are placed on{" "}
              <strong style={{ color: "#8b5cf6" }}>Academic Probation</strong>.
            </>,
            "A student on probation must raise their CGPA to 2.00 within two semesters to avoid being dropped from the program.",
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<BookCopy className="w-4 h-4" style={{ color: "#ec4899" }} />}
        title="Course Evaluation"
        color="#ec4899"
        delay={0.15}
      >
        <StyledList
          color="#ec4899"
          items={[
            <>
              <strong style={{ color: "#e5e7eb" }}>Sessional Marks (50%):</strong>{" "}
              Quizzes, assignments, projects, and a mid-term exam.
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>Final Examination (50%):</strong>{" "}
              A comprehensive exam at the end of the semester.
            </>,
          ]}
        />
        <InfoBox
          icon={
            <InfoIcon className="w-4 h-4" style={{ color: "#ec4899" }} />
          }
          color="#ec4899"
        >
          Appearing in the final examination is{" "}
          <strong style={{ color: "#ec4899" }}>mandatory</strong> to pass any
          course.
        </InfoBox>
      </SectionCard>

      <SectionCard
        icon={<Repeat className="w-4 h-4" style={{ color: "#f59e0b" }} />}
        title="Repeating a Course"
        color="#f59e0b"
        delay={0.2}
      >
        <p>
          Students{" "}
          <strong style={{ color: "#f59e0b" }}>must repeat</strong> a course
          with an &apos;F&apos; grade. They may optionally repeat courses with
          &apos;D&apos; or &apos;C&apos; grades to improve their CGPA, up to a
          maximum of{" "}
          <strong style={{ color: "#e5e7eb" }}>12 credit hours</strong>.
        </p>
      </SectionCard>

      <SectionCard
        icon={<FileWarning className="w-4 h-4" style={{ color: "#10b981" }} />}
        title="Special Cases"
        color="#10b981"
        delay={0.25}
      >
        <StyledList
          color="#10b981"
          items={[
            <>
              <strong style={{ color: "#e5e7eb" }}>Incomplete (&apos;I&apos;) Grade:</strong>{" "}
              Awarded for a valid, documented absence from a final exam. Must be
              cleared within two weeks of the next semester.
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>Makeup Exam:</strong> May be
              granted for a missed exam due to a legitimate reason, subject to
              the Dean&apos;s approval.
            </>,
            <>
              <strong style={{ color: "#e5e7eb" }}>Re-checking:</strong> Students
              can apply for re-checking (not re-grading) of final exam scripts
              within seven days of result declaration.
            </>,
          ]}
        />
      </SectionCard>
    </TabContainer>
  );
}

/* ===== SCHOLARSHIP CRITERIA ===== */
export function ScholarshipCriteriaTab() {
  return (
    <TabContainer>
      <PageTitle>Scholarships & Academic Awards</PageTitle>

      <SectionCard
        icon={<Star className="w-4 h-4" style={{ color: "#f59e0b" }} />}
        title="Dean's Honor List"
        color="#f59e0b"
        delay={0.05}
      >
        <p>
          Undergraduate students achieving a semester GPA of{" "}
          <strong style={{ color: "#f59e0b" }}>3.50 or higher</strong> while
          taking a full course load (min. 12 credit hours) are placed on the
          Dean&apos;s Honor List for that semester.
        </p>
      </SectionCard>

      <SectionCard
        icon={<Award className="w-4 h-4" style={{ color: "#3b82f6" }} />}
        title="Chancellor's Gold Medal"
        color="#3b82f6"
        delay={0.1}
      >
        <p>
          Awarded to the top graduating student in each degree program who meets
          the following criteria:
        </p>
        <StyledList
          color="#3b82f6"
          items={[
            <>
              Minimum CGPA of{" "}
              <strong style={{ color: "#3b82f6" }}>3.50</strong>.
            </>,
            "Completed degree within the minimum required duration.",
            "No 'F' or 'W' grades on the transcript.",
            "Clean disciplinary record.",
          ]}
        />
      </SectionCard>

      <SectionCard
        icon={<Trophy className="w-4 h-4" style={{ color: "#8b5cf6" }} />}
        title="President's Gold Medal"
        color="#8b5cf6"
        delay={0.15}
      >
        <p>
          This is the highest academic honor, awarded to the{" "}
          <strong style={{ color: "#8b5cf6" }}>
            overall best graduating student
          </strong>{" "}
          from all undergraduate programs in a given year, selected from the
          recipients of the Chancellor&apos;s Gold Medal.
        </p>
      </SectionCard>

      <div
        className="rounded-xl p-5 text-center animate-fadeIn"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px dashed rgba(255,255,255,0.08)",
          animationDelay: "0.2s",
        }}
      >
        <InfoIcon
          className="w-5 h-5 mx-auto mb-2"
          style={{ color: "#4b5563" }}
        />
        <p
          className="font-medium"
          style={{ fontSize: "13px", color: "#4b5563", lineHeight: "1.6" }}
        >
          For details on financial scholarships and fee waivers, students should
          contact the{" "}
          <strong style={{ color: "#6b7280" }}>Financial Aid Office</strong> at
          PAF-IAST directly.
        </p>
      </div>
    </TabContainer>
  );
}
