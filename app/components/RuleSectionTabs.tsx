// app/components/RuleSectionTabs.tsx
import React from 'react';
import {
    FileText, CalendarDays, UserPlus, GraduationCap, Clock, Replace, BookUser,
    Gavel, ShieldCheck, Ban, AlertTriangle, Scale,
    ClipboardList, BarChart2, FileWarning, Repeat, RefreshCcw, BookCopy,
    Award, Star, Trophy
} from 'lucide-react';

// --- Reusable UI Components ---

// Main container for each tab's content
const TabContentContainer = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-8">
            {children}
        </div>
    </div>
);

// A card component to encapsulate each section
const SectionCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-5 border-b border-gray-700 flex items-center space-x-4">
            <div className="text-blue-400">{icon}</div>
            <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <div className="p-5 text-gray-300 space-y-4">
            {children}
        </div>
    </div>
);

// A styled list for better readability
const StyledList = ({ items }: { items: React.ReactNode[] }) => (
    <ul className="space-y-3 pl-5">
        {items.map((item, index) => (
            <li key={index} className="flex items-start">
                <span className="text-blue-400 mr-3 mt-1">&#10148;</span>
                <span>{item}</span>
            </li>
        ))}
    </ul>
);

// Styled table for data
const StyledTable = ({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) => (
    <div className="overflow-x-auto rounded-md border border-gray-700">
        <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700">
                <tr>
                    {headers.map(header => (
                        <th key={header} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-700/50 transition-colors">
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 text-sm text-gray-300">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


// --- Tab Content Components ---

export function AcademicRegulationsTab() {
    return (
        <TabContentContainer>
            <h2 className="text-3xl font-extrabold text-white text-center">Academic Regulations</h2>

            <SectionCard icon={<FileText size={24} />} title="Scope and Commencement">
                <p>These rules, titled <strong>"PAF-IAST Bachelors Academic Rules 2021,"</strong> are effective from the date of approval by the Board of Governors and apply to all undergraduate programs.</p>
            </SectionCard>

            <SectionCard icon={<BookUser size={24} />} title="Definitions">
                <StyledList items={[
                    <><strong>Academic Year:</strong> Two regular semesters (Fall, Spring) and an optional Summer semester.</>,
                    <><strong>Credit Hour:</strong> One hour of theory or three hours of lab work per week.</>,
                    <><strong>CGPA:</strong> Cumulative Grade Point Average, the weighted average of grades from all semesters.</>,
                    <><strong>GPA:</strong> Grade Point Average for a single semester.</>,
                ]} />
            </SectionCard>

            <SectionCard icon={<CalendarDays size={24} />} title="Academic Calendar">
                <StyledList items={[
                    <><strong>Fall Semester:</strong> 18 weeks (Sept/Oct start).</>,
                    <><strong>Spring Semester:</strong> 18 weeks (Feb/Mar start).</>,
                    <><strong>Summer Semester:</strong> 9 weeks (optional).</>,
                ]} />
            </SectionCard>

            <SectionCard icon={<UserPlus size={24} />} title="Admission">
                <p>Admission is based on merit, determined by tests and prior academic records. Admission can be canceled for document forgery, disciplinary issues, or non-payment of dues.</p>
            </SectionCard>

            <SectionCard icon={<Clock size={24} />} title="Credit & Semester System">
                <StyledList items={[
                    <>A BS degree requires a minimum of <strong>130 credit hours</strong>.</>,
                    <>Standard semester load: <strong>12-18 credit hours</strong> (up to 21 for CGPA ≥ 3.50).</>,
                    <>A maximum of <strong>two semesters</strong> can be "frozen" during the degree program.</>
                ]} />
            </SectionCard>

            <SectionCard icon={<Replace size={24} />} title="Course Registration & Changes">
                <StyledList items={[
                    <>Course registration is mandatory at the start of each semester.</>,
                    <>Courses can be added or dropped within the <strong>first 7 days</strong>.</>,
                    <>Withdrawal ('W' grade) is allowed within the <strong>first 10 weeks</strong>.</>
                ]} />
            </SectionCard>

            <SectionCard icon={<GraduationCap size={24} />} title="Graduation Requirements">
                <StyledList items={[
                    <>Complete all required credit hours (130+).</>,
                    <>Achieve a minimum CGPA of <strong>2.00</strong>.</>,
                    <>Complete the degree within the maximum duration (7 years for a 4-year degree).</>,
                ]} />
                <div className="p-4 bg-blue-900/30 border-l-4 border-blue-400 text-blue-200 rounded-r-lg">
                    <p><strong>Attendance Requirement:</strong> A minimum of <strong>75% attendance</strong> is mandatory to be eligible for final exams. An 'F' grade will be awarded for attendance below 65%.</p>
                </div>
            </SectionCard>
        </TabContentContainer>
    );
}

export function CodeOfConductTab() {
    return (
        <TabContentContainer>
            <h2 className="text-3xl font-extrabold text-white text-center">Code of Conduct</h2>

            <SectionCard icon={<Gavel size={24} />} title="General Rules">
                <p>Students must maintain discipline, show respect to all members of the Institute community, and adhere strictly to all rules and regulations of PAF-IAST.</p>
            </SectionCard>

            <SectionCard icon={<ShieldCheck size={24} />} title="Student Expectations">
                <StyledList items={[
                    "Uphold the Institute's mission and values.",
                    "Practice academic honesty and integrity.",
                    "Respect the rights and property of others.",
                    "Refrain from activities that disrupt the academic environment.",
                    "Contribute positively to the community."
                ]} />
            </SectionCard>

            <SectionCard icon={<Ban size={24} />} title="Acts of Indiscipline and Misconduct">
                <p>The following are strictly prohibited:</p>
                <StyledList items={[
                    "Academic dishonesty (cheating, plagiarism).",
                    "Disruption of teaching or administrative activities.",
                    "Harassment, abuse, or intimidation.",
                    "Theft or damage to property.",
                    "Forgery or misuse of Institute documents.",
                    "Possession of illegal drugs, alcohol, or weapons.",
                    "Violation of examination rules."
                ]} />
            </SectionCard>

            <SectionCard icon={<Scale size={24} />} title="Sanctions for Indiscipline">
                <p>Penalties are imposed by the Campus Disciplinary Committee (CDC) based on the severity of the offense:</p>
                <StyledList items={[
                    <><strong>Warning:</strong> A formal written reprimand.</>,
                    <><strong>Probation:</strong> A period of observation.</>,
                    <><strong>Suspension:</strong> Temporary removal from the Institute.</>,
                    <><strong>Expulsion:</strong> Permanent removal from the Institute.</>,
                    <><strong>Cancellation of Degree:</strong> For severe fraud discovered post-graduation.</>,
                ]} />
            </SectionCard>
        </TabContentContainer>
    );
}

export function ExaminationPolicyTab() {
    const gradingData = [
        ["A", "4.00", "85-100"], ["A-", "3.67", "80-84"], ["B+", "3.33", "75-79"], ["B", "3.00", "70-74"],
        ["B-", "2.67", "65-69"], ["C+", "2.33", "60-64"], ["C", "2.00", "55-59"], ["D", "1.00", "50-54"],
        ["F", "0.00", "Below 50"], ["W", "-", "Withdrawal"], ["I", "-", "Incomplete"],
    ];

    return (
        <TabContentContainer>
            <h2 className="text-3xl font-extrabold text-white text-center">Examination Policy</h2>

            <SectionCard icon={<ClipboardList size={24} />} title="Grading System">
                <p>Student performance is evaluated using letter grades, each with a corresponding Grade Point value.</p>
                <StyledTable headers={["Grade", "Points", "Marks (%)"]} rows={gradingData} />
            </SectionCard>

            <SectionCard icon={<BarChart2 size={24} />} title="Academic Standing">
                <StyledList items={[
                    <>A minimum CGPA of <strong>2.00</strong> is required for graduation.</>,
                    <>Students with a CGPA below 2.00 are placed on <strong>Academic Probation</strong>.</>,
                    <>A student on probation must raise their CGPA to 2.00 within two semesters to avoid being dropped from the program.</>
                ]} />
            </SectionCard>

            <SectionCard icon={<BookCopy size={24} />} title="Course Evaluation">
                <StyledList items={[
                    <><strong>Sessional Marks (50%):</strong> Quizzes, assignments, projects, and a mid-term exam.</>,
                    <><strong>Final Examination (50%):</strong> A comprehensive exam at the end of the semester.</>
                ]} />
                <div className="p-4 bg-blue-900/30 border-l-4 border-blue-400 text-blue-200 rounded-r-lg">
                    <p>Appearing in the final examination is <strong>mandatory</strong> to pass any course.</p>
                </div>
            </SectionCard>

            <SectionCard icon={<Repeat size={24} />} title="Repeating a Course">
                <p>Students <strong>must repeat</strong> a course with an 'F' grade. They may optionally repeat courses with 'D' or 'C' grades to improve their CGPA, up to a maximum of <strong>12 credit hours</strong>.</p>
            </SectionCard>

            <SectionCard icon={<FileWarning size={24} />} title="Special Cases">
                <StyledList items={[
                    <><strong>Incomplete ('I') Grade:</strong> Awarded for a valid, documented absence from a final exam. Must be cleared within two weeks of the next semester.</>,
                    <><strong>Makeup Exam:</strong> May be granted for a missed exam due to a legitimate reason, subject to the Dean's approval.</>,
                    <><strong>Re-checking:</strong> Students can apply for re-checking (not re-grading) of final exam scripts within seven days of result declaration.</>
                ]} />
            </SectionCard>
        </TabContentContainer>
    );
}

export function ScholarshipCriteriaTab() {
    return (
        <TabContentContainer>
            <h2 className="text-3xl font-extrabold text-white text-center">Scholarships & Academic Awards</h2>

            <SectionCard icon={<Star size={24} />} title="Dean's Honor List">
                <p>Undergraduate students achieving a semester GPA of <strong>3.50 or higher</strong> while taking a full course load (min. 12 credit hours) are placed on the Dean's Honor List for that semester.</p>
            </SectionCard>

            <SectionCard icon={<Award size={24} />} title="Chancellor’s Gold Medal">
                <p>Awarded to the top graduating student in each degree program who meets the following criteria:</p>
                <StyledList items={[
                    <>Minimum CGPA of <strong>3.50</strong>.</>,
                    <>Completed degree within the minimum required duration.</>,
                    <>No 'F' or 'W' grades on the transcript.</>,
                    <>Clean disciplinary record.</>,
                ]} />
            </SectionCard>

            <SectionCard icon={<Trophy size={24} />} title="President’s Gold Medal">
                <p>This is the highest academic honor, awarded to the <strong>overall best graduating student</strong> from all undergraduate programs in a given year, selected from the recipients of the Chancellor's Gold Medal.</p>
            </SectionCard>

            <div className="mt-6 p-4 text-center bg-gray-800 rounded-lg border border-dashed border-gray-600">
                <p className="italic text-gray-400">
                    Note: For details on financial scholarships and fee waivers, students should contact the <strong>Financial Aid Office</strong> at PAF-IAST directly.
                </p>
            </div>
        </TabContentContainer>
    );
}
