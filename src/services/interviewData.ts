export interface InterviewQuestion {
  id: string;
  category: "technical" | "hr" | "coding";
  question: string;
  answer: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  role: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const questionsDB: Record<string, InterviewQuestion[]> = {
  "Software Engineer": [
    { id: "se1", category: "technical", question: "Explain the difference between a stack and a queue.", answer: "A stack follows LIFO (Last In, First Out) — the last element added is the first removed. A queue follows FIFO (First In, First Out) — the first element added is the first removed. Stacks are used in function calls and undo operations, while queues are used in scheduling and BFS.", difficulty: "beginner", role: "Software Engineer" },
    { id: "se2", category: "technical", question: "What is the time complexity of binary search?", answer: "O(log n). Binary search works on sorted arrays by repeatedly dividing the search interval in half, making it much faster than linear search O(n) for large datasets.", difficulty: "beginner", role: "Software Engineer" },
    { id: "se3", category: "technical", question: "Explain the concept of database normalization.", answer: "Database normalization organizes data to reduce redundancy. 1NF eliminates repeating groups, 2NF removes partial dependencies, 3NF removes transitive dependencies. It improves data integrity but may reduce read performance.", difficulty: "intermediate", role: "Software Engineer" },
    { id: "se4", category: "coding", question: "How would you implement a LRU Cache?", answer: "Use a HashMap combined with a Doubly Linked List. The HashMap provides O(1) lookup, while the linked list maintains access order. On access, move the node to the head. On insertion when full, remove the tail node.", difficulty: "advanced", role: "Software Engineer" },
    { id: "se5", category: "technical", question: "What are microservices and when would you use them?", answer: "Microservices architecture breaks an application into small, independent services that communicate via APIs. Use them when you need independent scaling, technology diversity, team autonomy, and fault isolation. Avoid for simple apps due to added complexity.", difficulty: "advanced", role: "Software Engineer" },
    { id: "se6", category: "hr", question: "Tell me about a time you disagreed with a team member.", answer: "Use the STAR method: Describe the Situation, the Task at hand, the Action you took (listened, found common ground, proposed data-driven solution), and the Result (successful resolution, improved process).", difficulty: "beginner", role: "Software Engineer" },
    { id: "se7", category: "hr", question: "Why do you want to work at our company?", answer: "Research the company's mission, products, culture, and recent achievements. Connect your skills and values to their needs. Show genuine enthusiasm and explain how you can contribute to their goals.", difficulty: "beginner", role: "Software Engineer" },
    { id: "se8", category: "coding", question: "Write a function to detect a cycle in a linked list.", answer: "Use Floyd's Tortoise and Hare algorithm: two pointers moving at different speeds. If there's a cycle, they'll eventually meet. Time: O(n), Space: O(1). This is more efficient than using a hash set O(n) space.", difficulty: "intermediate", role: "Software Engineer" },
    { id: "se9", category: "technical", question: "Explain REST API design principles.", answer: "REST uses HTTP methods (GET, POST, PUT, DELETE) for CRUD operations, stateless communication, resource-based URLs, proper status codes, pagination, versioning, and HATEOAS. It provides a standardized, scalable way to build web APIs.", difficulty: "intermediate", role: "Software Engineer" },
    { id: "se10", category: "technical", question: "What is system design and how do you approach it?", answer: "System design involves planning architecture for scalable systems. Approach: clarify requirements, estimate scale, design high-level architecture, deep-dive into components, address bottlenecks, and discuss trade-offs. Consider load balancing, caching, database sharding, and CDNs.", difficulty: "advanced", role: "Software Engineer" },
  ],
  "Data Analyst": [
    { id: "da1", category: "technical", question: "What is the difference between SQL JOIN types?", answer: "INNER JOIN returns matching rows from both tables. LEFT JOIN returns all left table rows + matching right. RIGHT JOIN is the opposite. FULL OUTER JOIN returns all rows from both. CROSS JOIN produces cartesian product.", difficulty: "beginner", role: "Data Analyst" },
    { id: "da2", category: "technical", question: "Explain the ETL process.", answer: "ETL stands for Extract, Transform, Load. Extract pulls data from sources, Transform cleans/standardizes it (handling nulls, deduplication, formatting), Load puts it into a data warehouse. Modern alternatives include ELT where transformation happens after loading.", difficulty: "intermediate", role: "Data Analyst" },
    { id: "da3", category: "technical", question: "What are window functions in SQL?", answer: "Window functions perform calculations across a set of rows related to the current row without grouping. Examples: ROW_NUMBER(), RANK(), LAG(), LEAD(), SUM() OVER(). They're essential for running totals, rankings, and moving averages.", difficulty: "intermediate", role: "Data Analyst" },
    { id: "da4", category: "hr", question: "How do you communicate complex data findings to non-technical stakeholders?", answer: "Use clear visualizations, tell a story with data, avoid jargon, focus on business impact, use analogies, provide actionable recommendations, and tailor the level of detail to the audience.", difficulty: "beginner", role: "Data Analyst" },
    { id: "da5", category: "coding", question: "Write a SQL query to find the second highest salary.", answer: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees); Or use: SELECT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1; Or use DENSE_RANK() window function.", difficulty: "intermediate", role: "Data Analyst" },
    { id: "da6", category: "technical", question: "What is A/B testing and how do you analyze results?", answer: "A/B testing compares two versions to determine which performs better. Key steps: define hypothesis, determine sample size, run test, calculate statistical significance (p-value < 0.05), check confidence intervals, and consider practical significance.", difficulty: "advanced", role: "Data Analyst" },
  ],
  "Product Manager": [
    { id: "pm1", category: "hr", question: "How do you prioritize features?", answer: "Use frameworks like RICE (Reach, Impact, Confidence, Effort), MoSCoW, or value vs effort matrix. Consider user feedback, business goals, technical feasibility, and market trends. Always tie priorities to measurable outcomes.", difficulty: "intermediate", role: "Product Manager" },
    { id: "pm2", category: "technical", question: "How do you define and track product metrics?", answer: "Use the HEART framework (Happiness, Engagement, Adoption, Retention, Task success) or North Star metric approach. Define leading and lagging indicators, set up dashboards, and review metrics regularly to inform decisions.", difficulty: "intermediate", role: "Product Manager" },
    { id: "pm3", category: "hr", question: "Describe a product you'd improve and how.", answer: "Pick a product you use. Identify pain points through user lens. Propose specific improvements with reasoning. Show understanding of constraints (engineering effort, business model, user segments). Demonstrate product thinking.", difficulty: "beginner", role: "Product Manager" },
    { id: "pm4", category: "hr", question: "How do you handle conflicting stakeholder priorities?", answer: "Listen to all perspectives, align on shared goals, use data to support decisions, propose compromises, escalate when needed, and communicate decisions transparently. Build trust through consistent, fair processes.", difficulty: "advanced", role: "Product Manager" },
  ],
  "UX Designer": [
    { id: "ux1", category: "technical", question: "Walk me through your design process.", answer: "Research (user interviews, surveys) → Define (personas, user stories, problem statements) → Ideate (brainstorming, sketching) → Prototype (wireframes, hi-fi mockups) → Test (usability testing, A/B tests) → Iterate based on feedback.", difficulty: "beginner", role: "UX Designer" },
    { id: "ux2", category: "technical", question: "How do you conduct usability testing?", answer: "Define objectives, recruit representative users (5-8), create task scenarios, moderate sessions (think-aloud protocol), observe without leading, take notes, analyze patterns, prioritize findings, and iterate on design.", difficulty: "intermediate", role: "UX Designer" },
    { id: "ux3", category: "hr", question: "How do you handle design critique?", answer: "Separate ego from work, listen actively, ask clarifying questions, evaluate feedback against user data and goals, be open to alternatives, explain design rationale when needed, and use critique as a growth opportunity.", difficulty: "beginner", role: "UX Designer" },
  ],
};

export const getQuestionsForRole = (role: string, level: string): InterviewQuestion[] => {
  const roleQuestions = questionsDB[role] || questionsDB["Software Engineer"];
  if (level === "all") return roleQuestions;
  return roleQuestions.filter(q => q.difficulty === level);
};

export const getRoles = () => Object.keys(questionsDB);

export const generateQuiz = (role: string): QuizQuestion[] => {
  const questions = questionsDB[role] || questionsDB["Software Engineer"];
  const quizQuestions: QuizQuestion[] = questions.slice(0, 10).map((q, i) => {
    const correctAnswer = q.answer.split(".")[0] + ".";
    const wrongAnswers = [
      "This is a common misconception that leads to incorrect implementations.",
      "While partially correct, this misses the key concept.",
      "This approach would work but is not the optimal solution.",
    ];
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    return {
      id: `quiz_${i}`,
      question: q.question,
      options,
      correctIndex: options.indexOf(correctAnswer),
      explanation: q.answer,
    };
  });
  return quizQuestions;
};

export const EXPERIENCE_LEVELS = ["beginner", "intermediate", "advanced"];
